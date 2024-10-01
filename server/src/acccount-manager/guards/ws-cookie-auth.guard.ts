import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as c from 'cookie-parser';
import { User } from '../entities/user.entity';
import { WSCookieStrategy } from '../strategies/ws-cookie.strategy';

@Injectable()
export class WsCookieGuard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: WSCookieStrategy });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');

    if (!cookies.some((cookie) => cookie.startsWith('NEH_is_cool'))) {
      return false;
    }

    const authToken = cookies.find((cookie) => cookie.startsWith('NEH_is_cool')).split('=')[1];

    if (!authToken || authToken.length === 0) {
      return false;
    }

    // Obscure non-documented work-around:
    // https://github.com/expressjs/cookie-parser/issues/48#issuecomment-702510136
    const decodedSignedCookie = decodeURIComponent(authToken);
    const jwtPayload = c.signedCookie(decodedSignedCookie, 'secret_placeholder') as string;

    let user: User;
    try {
      user = await this.jwtService.verify(jwtPayload, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      return false;
    }
    context.switchToHttp().getRequest().user = user;
    return Boolean(user);
  }
}
