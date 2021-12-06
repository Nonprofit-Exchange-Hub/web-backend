import { Controller, Post, Response, Request, UseGuards, Get, Next } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { AuthService } from './auth.service';
import { COOKIE_KEY } from './constants';

import type { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request,
    @Response({ passthrough: true }) response,
    // @Next() next,
  // ): Promise<{ user: Omit<User, 'password'> }> {
  ): Promise<void> {
    const jwt = await this.authService.createJwt({ ...request.user });
    response.cookie(
      COOKIE_KEY,
      jwt,
      {
        domain: 'localhost',
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        // isSecure: process.env.NODE_ENV !== 'development',
        secure: true,
        isSecure: true,
        clearInvalid: true,
        path: '/api',
      },
    ).send({ user: request.user });
    // console.log('\n\n');
    // console.log(response);
    // console.log('\n\n');
    // next();
    // response.send();
  }

  @Get('session')
  @UseGuards(CookieAuthGuard)
  async session(@Request() request): Promise<{ user: Omit<User, 'password'>}> {
    console.log('\n\n')
    console.log('here')
    console.log('\n\n')
    const { user } = request;
    console.log('\n\n')
    console.log('user', user)
    console.log('\n\n')
    return { user };
  }

  async logout(@Response({ passthrough: true }) response): Promise<void> {
    response.status(200).clearCookie(COOKIE_KEY);
  }
}
