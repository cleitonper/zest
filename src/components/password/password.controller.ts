import {
  Controller,
  Post, HttpCode,
  Headers, Get, Query, Body,
} from '@nestjs/common';

import { PasswordService } from './password.service';

@Controller()
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @HttpCode(200)
  @Post('forgot-password')
  async forgot(
    @Headers('host') host: string,
    @Body('email') email: string,
  ) {
    const resetPassBaseAddr = `http://${host}/reset-password`;
    return await this.passwordService.forgot(email, resetPassBaseAddr);
  }

  @Get('reset-password')
  resetPassword(@Query('token') token: string) {
    return this.passwordService.validateResetPassToken(token);
  }
}
