import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigService, ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const uri = config.get('database.uri');
        const options = config.get('database.options');
        return { uri, ...options };
      },
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
    }),
  ],
})
export class DatabaseModule {}