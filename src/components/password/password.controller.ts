import {
  Controller,
  Get, Post, HttpCode, Render,
  Response, Headers, Query, Body,
} from '@nestjs/common';

import { PasswordService } from './password.service';
import { UserService }     from '../user/user.service';
import { User }            from '../user/types';

@Controller()
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {}

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
  @Render('email/password/change')
  async reset(
    @Query('token') token: string,
    @Response() response,
  ) {
    return await this.passwordService.validateResetPassToken(token)
      ? { token }
      : response.redirect('/reset-password/error');
  }

  @Post('reset-password')
  async change(
    @Response() response,
    @Body() body,
  ) {
    const { token, password } = body;

    const user = await this.passwordService.validateResetPassToken(token) as User;
    if (!user) return response.redirect('/reset-password/error');

    const { _id } = user;

    await this.userService.update(_id, { password });

    return response.redirect('/reset-password/success');
  }

  @Get('reset-password/error')
  @Render('email/message/index')
  error() {
    const title = 'Invalid credentials';
    const message = '' +
      'You are trying to use an invalid link to reset your password. ' +
      'If this link is older or if you already use it, request a new one.';

    return { title, message };
  }

  @Get('reset-password/success')
  @Render('email/message/index')
  success() {
    const title = 'Password updated';
    const message = 'Your password was successful updated.';

    return { title, message };
  }
}
