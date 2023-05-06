import { registerAs, ConfigType } from '@nestjs/config';
import { readPackageJson } from '@utils';

export const appConfig = registerAs('app', () => {
  const packageJson = readPackageJson();

  return {
    name: 'gallery-cloud',
    port: +(process.env.PORT ?? 8080),
    version: packageJson.version as string,
  };
});

export type AppConfig = ConfigType<typeof appConfig>;
