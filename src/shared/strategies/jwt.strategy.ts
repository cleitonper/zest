import * as dotenv from 'dotenv';

import { Injectable }           from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../../components/auth/auth.service';
import { Credentials } from '../../components/auth/types';
import { User }        from '../../components/user/types';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(credentials: Credentials): Promise<User> {
    return await this.authService.validate(credentials);
  }
}