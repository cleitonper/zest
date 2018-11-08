import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { viewEngineConfig, staticAssetsConfig } from './config/asstes';
import { validationConfig } from './config/validation';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  app.useStaticAssets(staticAssetsConfig);
  app.setViewEngine(viewEngineConfig);
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
