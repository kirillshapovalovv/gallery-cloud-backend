import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
// config
import { appConfig } from '@config/app.config';
import { authConfig } from '@config/auth.config';
import { dbConfig } from '@config/db.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [appConfig, authConfig, dbConfig],
    }),
  ],
})
export class ConfigModule {}
