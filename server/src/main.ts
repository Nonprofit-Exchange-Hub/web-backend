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
    origin: process.env.FE_DOMAIN,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  app.use(cookieParser('secret_placeholder'));

  const config = new DocumentBuilder()
    .setTitle('Nonprofit Circle API')
    .setDescription('Our API monolith')
    .setVersion('0.0')
    .addCookieAuth('NEH_is_cool')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
