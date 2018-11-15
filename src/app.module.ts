import { Module }       from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { DatabaseModule, MailerModule } from './services';

import { AppController } from './app.controller';
import { AppService }    from './app.service';
import { UserModule }    from './components/user/user.module';
import { AuthModule }    from './components/auth/auth.module';

@Module({
  imports: [
    ConfigModule.load(),
    MailerModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
