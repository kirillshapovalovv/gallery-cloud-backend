import { Module } from '@nestjs/common';
// modules
import { ConfigModule } from '@modules/config/config.module';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
