import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerProvider } from '@nest-modules/mailer';
import { ConfigService }  from 'nestjs-config';

import * as jwt from 'jsonwebtoken';

import { User }        from '../user/types';
import { UserService } from '../user/user.service';

@Injectable()
export class PasswordService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailer: MailerProvider,
    private readonly userService: UserService,
  ) {}

  private createResetPassSecret(user: User): string {
    const { updatedAt } = user;
    const tokenSecret = this.config.get('jwt.secret');

    return `${tokenSecret}-${updatedAt}`;
  }

  private createResetPassToken(user: User): string {
    const { _id } = user;
    const tokenTTL = this.config.get('app.resetPassTTL');

    const secret = this.createResetPassSecret(user);
    const payload: Partial<User> = { _id };
    const options = { expiresIn: tokenTTL };
    const token = jwt.sign(payload, secret, options);

    return token;
  }

  async validateResetPassToken(token: string): Promise<boolean> {
    let isValidToken: boolean;

    try {
      const { _id } = jwt.decode(token) as Partial<User>;
      const user    = await this.userService.get(_id);
      const secret  = this.createResetPassSecret(user);

      jwt.verify(token, secret);
      isValidToken = true;
    } catch (error) {
      isValidToken = false;
    }

    if (!isValidToken) return false;

    return true;
  }

  private createResetPassAddr(baseAddr: string, user: User): string {
    const token = this.createResetPassToken(user);

    return `${baseAddr}?token=${token}`;
  }

  async forgot(email: string, resetPassBaseAddr: string) {
    const user: User = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const { name } = user;
    const resetPassAddr = this.createResetPassAddr(resetPassBaseAddr, user);
    const resetPassTTL =  this.config.get('app.resetPassTTL');

    this.mailer.sendMail({
      to: `${name} <${email}>`,
      subject: 'Reset your password',
      template: 'email/password/forgot',
      context: {
        name,
        resetPassAddr,
        resetPassTTL,
      },
    });

    return { message: 'Check the instructions sent to your email' };
  }
}
