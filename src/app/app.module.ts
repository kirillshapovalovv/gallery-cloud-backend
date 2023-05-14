import { Module } from '@nestjs/common';
// modules
import { ConfigModule } from '@modules/config/config.module';
import { DatabaseModule } from '@modules/database/database.module';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
