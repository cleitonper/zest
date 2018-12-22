import { NestFactory, FastifyAdapter }    from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe }                 from '@nestjs/common';

import { viewEngineConfig, staticAssetsConfig } from './config/asstes';
import { validationConfig }                     from './config/validation';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  const options = new DocumentBuilder()
    .setTitle('Zest')
    .setDescription('The Zest API docs')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explore', app, document);

  app.useStaticAssets(staticAssetsConfig);
  app.setViewEngine(viewEngineConfig);
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const { NODE_ENV, PORT } = process.env;

  NODE_ENV === 'production'
    ? await app.listen(PORT)
    : await app.listen(PORT, '0.0.0.0');
}
bootstrap();
