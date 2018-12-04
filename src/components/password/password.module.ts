import { Module } from '@nestjs/common';

import { PasswordController } from './password.controller';
import { PasswordService }    from './password.service';
import { UserModule }         from '../user/user.module';

@Module({
  controllers: [ PasswordController ],
  providers: [ PasswordService ],
  imports: [ UserModule ],
})
export class PasswordModule {}
