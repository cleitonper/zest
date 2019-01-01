import {
  Controller,
  Post, HttpCode,
  Body,
} from '@nestjs/common';

import { ApiUseTags } from '@nestjs/swagger';

import { AuthService }        from './auth.service';
import { Token, Credentials } from './types';

@Controller()
@ApiUseTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() credentials: Credentials): Promise<Token> {
    return await this.authService.signin(credentials);
  }
}
