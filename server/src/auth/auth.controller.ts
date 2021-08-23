import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('test')
    @UseGuards(LoginAuthGuard)
    async authTest() {
        return {
            message: 'ヽ(•‿•)ノ',
        };
    }

    @Post('login')
    @UseGuards(LoginAuthGuard)
    async login(@Request() req) {
        return {status: 200, access_token: await this.authService.createJwt(req.user)};
    }
}
