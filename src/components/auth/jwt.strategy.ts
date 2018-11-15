import * as dotenv from 'dotenv';

import { Injectable }           from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService }     from './auth.service';
import { UserCredentials } from './types';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(credentials: UserCredentials): Promise<boolean> {
    return await this.authService.validate(credentials);
  }
}