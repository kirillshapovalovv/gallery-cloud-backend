import { registerAs, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// entities
import { User } from '@app/user/entities/user.entity';

export const dbConfig = registerAs(
  'db',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [User],
    autoLoadEntities: true,
  }),
);

export type DBConfig = ConfigType<typeof dbConfig>;
