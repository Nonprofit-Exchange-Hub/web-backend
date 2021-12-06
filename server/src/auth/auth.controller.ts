import { Controller, Post, Response, Request, UseGuards } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { AuthService } from './auth.service';

import type { User } from '../users/entities/user.entity';

const COOKIE_KEY = 'NEH_is_cool';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(@Request() req, @Response() response): Promise<{ status: number, user: User }> {
    const jwt = await this.authService.createJwt({ ...req.user });
    response.cookie(COOKIE_KEY, jwt);

    return {
      status: 200,
      user: req.user,
    };
  }

  async logout(@Response() response): Promise<void> {
    response.status(200).clearCookie(COOKIE_KEY);
  }
}
