import { resolve } from 'path';

import { Module }       from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { DatabaseModule, MailerModule } from './shared/services';

import { AppController } from './app.controller';
import { AppService }    from './app.service';
import { UserModule }    from './components/user/user.module';
import { AuthModule }    from './components/auth/auth.module';
import { PasswordModule } from './components/password/password.module';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config/**/!(*.d).{ts,js}'),
    ),
    MailerModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PasswordModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
