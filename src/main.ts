import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
// modules
import { AppModule } from '@app/app.module';
// config
import { AppConfig, appConfig } from '@config/app.config';
// swagger
import { setupSwagger } from './setup-swagger';
// pipes
import { ValidationPipe } from '@lib/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = app.get<AppConfig>(appConfig.KEY);
  setupSwagger(app, { version: config.version || '0.0.0' });
  await app.listen(config.port);
}
bootstrap();
