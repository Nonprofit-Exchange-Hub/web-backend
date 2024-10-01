import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CookieStrategy } from '../strategies/cookie.strategy';
import { COOKIE_KEY } from '../constants';
import { User } from '../entities/user.entity';

@Injectable()
export class CookieAuthGuard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: CookieStrategy });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.signedCookies[COOKIE_KEY];

    if (!jwt) {
      return false;
    }

    let user: User; // instantiate as user class instead of object so that relations can be loaded
    try {
      user = await this.jwtService.verify(jwt, { secret: process.env.JWT_SECRET });
    } catch (_e) {
      Logger.error(_e, CookieAuthGuard.name);
      return false;
    }

    request.user = user;
    return true;
  }
}
