import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
// modules
import { AppModule } from '@app/app.module';
// config
import { AppConfig, appConfig } from '@config/app.config';
// swagger
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('v1');
  const config = app.get<AppConfig>(appConfig.KEY);
  setupSwagger(app, { version: config.version || '0.0.0' });
  await app.listen(config.port);
}
bootstrap();
