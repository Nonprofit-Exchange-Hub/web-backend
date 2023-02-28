import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

dotenv.config({ path: __dirname + '/.env' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors({
    credentials: true,
    // TODO get env related base url
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser('secret_placeholder'));

  const config = new DocumentBuilder()
    .setTitle('Nonprofit Circle API')
    .setDescription('Our API monolith')
    .setVersion('0.0')
    .addTag('nonprofit')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
