import { Module }    from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from 'nestjs-config';

import { UserModule }     from '../user/user.module';
import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => {
        const secretOrPrivateKey = config.get('jwt.secret');
        const signOptions = { expiresIn: config.get('jwt.ttl') };
        return { secretOrPrivateKey, signOptions };
      },
    }),
    UserModule,
  ],
  providers: [ AuthService, JwtStrategy ],
  controllers: [ AuthController ],
})
export class AuthModule {}
