import {
  Controller,
  Post,
  Response,
  Request,
  UseGuards,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  ConflictException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import type { Request as RequestT, Response as ResponseT } from 'express';

import { COOKIE_KEY } from './constants';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizes } from '../file-storage/domain';
import { FilesStorageService } from '../file-storage/file-storage.service';
import {
  VerifyEmailDto,
  ReturnSessionDto,
  ReturnUserDto,
  ResetPasswordDto,
  LoginDto,
} from './dto/auth.dto';
import { UpdateUserInternal } from './dto/create-user.internal';
import { MapTo } from '../shared/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';

type AuthedRequest = RequestT & { user: User };

/**
 * controller handles the requests required for account management
 * including CRUD'ing the user entity
 */
@ApiTags('auth')
@Controller('auth')
export class AccountManagerController {
  constructor(
    private accountManagerService: AccountManagerService,
    private sendgridService: SendgridService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private fileStorageService: FilesStorageService,
  ) {}

  @Patch('verify-email')
  @ApiOperation({ summary: "Verify a user's email" })
  async verifyEmail(@Body() body: VerifyEmailDto): Promise<boolean> {
    try {
      const user = await this.jwtService.verify(body.token, { secret: process.env.JWT_SECRET });
      this.usersService.update(user.id, { email_verified: true } as UpdateUserInternal);
      return true;
    } catch (e) {
      Logger.error(`Unexpected error: ${e}`, AccountManagerController.name);
      throw Error('jwt verify fail');
    }
  }

  @MapTo(ReturnUserDto)
  @Post('register')
  async signup(@Body() signupDto: CreateUserDto): Promise<ReturnUserDto> {
    const exists = await this.usersService.userEmailExists(signupDto.email);

    if (exists) {
      Logger.debug(
        `Singup: found existing user: ${signupDto.email}`,
        AccountManagerController.name,
      );
      throw new ConflictException('Email already exists');
    }

    let user;
    let jwt;

    try {
      user = await this.usersService.create({
        email: signupDto.email,
        password: signupDto.password,
        firstName: signupDto.firstName,
        last_name: signupDto.last_name,
      } as CreateUserDto);
      jwt = await this.jwtService.sign(
        { ...user },
        {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET,
        },
      );
    } catch (error) {
      Logger.log(error, AccountManagerController.name);
      throw new InternalServerErrorException('There was an unexpected error with your request');
    }

    const mail = {
      to: user.email,
      subject: 'Givingful Email Verification',
      from: 'admin@nonprofitcircle.org',
      html: `
        <p>Hello ${user.firstName} ${user.last_name}</p>
        <p>Please click <a href="${process.env.FE_DOMAIN}/email-verification?token=${jwt}">here</a> to verify your email.</p>
        <p>(this link is valid for 1 hour)</p>
        <p>Thank you!!</p>
        <p>The Givingful Team</p>
      `,
      mailSettings: { sandboxMode: { enable: process.env.NODE_ENV !== 'staging' } },
    };
    if (process.env.NODE_ENV === 'staging') {
      await this.sendgridService.send(mail);
    }

    return user;
  }

  @Post('login')
  @UseGuards(LoginAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'User login' })
  async login(
    @Request() request: AuthedRequest,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    const { user } = request;
    if (!user) {
      throw new UnauthorizedException();
    }

    // TODO: we probably need a better solution for this
    // if (!user.email_verified && process.env.NODE_ENV === 'staging') {
    //   throw new HttpException(
    //     { status: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' },
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    const jwt = await this.accountManagerService.createJwt(user);
    response
      .cookie(COOKIE_KEY, jwt, {
        domain: process.env.COOKIE_DOMAIN ?? 'localhost',
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        signed: true,
      })
      .send({ user });
  }

  @Post('session')
  @UseGuards(CookieAuthGuard)
  @ApiOperation({ summary: 'Fetch user via session' })
  async session(@Request() request: AuthedRequest): Promise<ReturnSessionDto> {
    const { user } = request;
    const { firstName, last_name, email, profile_image_url } = await this.usersService.findOne(
      user.id,
    );
    return { user: { ...user, firstName, last_name, email, profile_image_url } };
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Response({ passthrough: true }) response: ResponseT): void {
    response
      .clearCookie(COOKIE_KEY, {
        domain: process.env.COOKIE_DOMAIN ?? 'localhost',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      })
      .send();
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Password reset Request' })
  async resetPasswordRequest(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    try {
      const user = await this.usersService.findByEmailOrFail(req.body.email);
      if (!user) {
        // any error hits catch, error type and msg not important
        throw new Error();
      }

      const jwt = await this.jwtService.sign(
        { valid: true, id: user.id },
        { expiresIn: '1h', secret: process.env.JWT_SECRET },
      );

      const mail = {
        to: user.email,
        subject: 'Givingful Password Reset',
        from: 'admin@nonprofitcircle.org',
        html: `
          <p>Hello ${user.firstName} ${user.last_name}</p>
          <p>Please click <a href="${process.env.FE_DOMAIN}/set-new-password?token=${jwt}">here</a> to reset your password</p>
          <p>(this link is valid for 1 hour)</p>
          <p>Thank you!!</p>
          <p>The Givingful Team</p>
        `,
      };
      if (process.env.NODE_ENV === 'staging') {
        await this.sendgridService.send(mail);
      }
      response.status(200);
    } catch (e) {
      // always respond 200 so hackerz don't know which emails are active and not
      response.status(200);
    }
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDtO: ResetPasswordDto,
  ): Promise<boolean | BadRequestException> {
    try {
      const { id } = await this.jwtService.verify(resetPasswordDtO.token, {
        secret: process.env.JWT_SECRET,
      });
      if (id) {
        this.usersService.updatePasswod(id, { password: resetPasswordDtO.password });
      }
      return true;
    } catch {
      throw new BadRequestException('jwt verify fail');
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload profile image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile_image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('users/profile/:id')
  @UseGuards(CookieAuthGuard)
  @UseInterceptors(
    FileInterceptor('profile_image', {
      limits: { fileSize: FileSizes.MB },
    }),
  )
  async upsertProfile(
    @Request() request: AuthedRequest,
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ReturnUserDto | BadRequestException> {
    const { user } = request;
    if (user.id !== id) {
      throw new BadRequestException('You can only update your own user');
    }

    if (/\.(jpe?g|png|gif)$/i.test(file.filename)) {
      return new BadRequestException(
        'Only valid image extensions allowed (.jpg, .jpeg, .png, .gif)',
      );
    }
    return this.saveFile(id, file);
  }

  private async saveFile(id: number, file: Express.Multer.File) {
    let dbUser: Omit<User, 'password'>;
    try {
      dbUser = await this.usersService.findOne(id);
    } catch {
      throw new InternalServerErrorException('There was an unexpected error with your request');
    }

    if (!dbUser) {
      return new BadRequestException('User not found');
    }

    const fileUrl = await this.fileStorageService.storeImage({
      file,
      userId: id,
      prefix: 'userprofile',
      replaceFlag: 'replace',
    });
    return await this.usersService.update(id, { ...dbUser, profile_image_url: fileUrl });
  }

  @UseGuards(CookieAuthGuard)
  @MapTo(ReturnUserDto)
  @Put('users/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      //   async update(
      //     @Request() request: AuthedRequest,
      //     @Param('id') id: number,
      //     @Body() updateUserDto: UpdateUserDto,
      //   ): Promise<ReturnUserDto> {
      //     const { user } = request;
      //     if (user.id !== id) {
      //       throw new BadRequestException('You can only update your own user');
      //     }
      //     const dbUser = await this.usersService.findOne(id);
      //     if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.interests) {
      const res = await this.accountManagerService.validateInterests(updateUserDto.interests.names);
      if (!res) {
        throw new BadRequestException('Invalid Categories');
      }
    }
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiExcludeEndpoint()
  @UseGuards(CookieAuthGuard)
  @Get('users/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(CookieAuthGuard)
  @Delete('users/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
