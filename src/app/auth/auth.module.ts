import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// modules
import { UserModule } from '@app/user/user.module';
// controllers
import { AuthController } from '@app/auth/controllers';
// services
import { AuthService } from '@app/auth/services';
// config
import { AuthConfig, authConfig } from '@config/auth.config';
// strategies
import { LocalStrategy, JwtStrategy } from '@app/auth/strategies';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: AuthConfig) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.accessTokenExpires },
      }),
      inject: [authConfig.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
