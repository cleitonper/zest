import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nest-modules/mailer';
import { ConfigService } from 'nestjs-config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: config.get('mailer.transport'),
        templateDir: config.get('mailer.templateDir'),
        templateOptions: config.get('mailer.templateOptions'),
        defaults: config.get('mailer.defaults'),
      }),
      inject: [ ConfigService ],
    }),
  ],
})
export class MailerModule {}