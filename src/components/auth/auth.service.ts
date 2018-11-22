import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Token, UserCredentials } from './types';
import { UserService } from '../user/user.service';
import { User } from '../user/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: UserCredentials): Promise<Token> {
    const { email, password } = credentials;
    if (!email || !password) throw new UnauthorizedException();

    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException();

    if (!await user.verifyPassword(password)) throw new UnauthorizedException();

    const token = this.jwtService.sign({ email });

    return { token };
  }

  async validate({ email }: Partial<UserCredentials>): Promise<User> {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException('The provided credentials has been deleted');
    return user;
  }
}
