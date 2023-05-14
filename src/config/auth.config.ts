import { registerAs, ConfigType } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenExpires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  refreshTokenExpires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
}));

export type AuthConfig = ConfigType<typeof authConfig>;
