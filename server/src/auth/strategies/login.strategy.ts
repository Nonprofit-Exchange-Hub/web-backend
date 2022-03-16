import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Change the expected validation field from username to email
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const isValid = await this.authService.validateUser(email, password);
    return true;
  }
}
