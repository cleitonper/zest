import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Token }       from './types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() credentials): Promise<Token> {
    return await this.authService.signin(credentials);
  }
}
