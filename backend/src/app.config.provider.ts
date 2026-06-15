import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER', 'postgres'),
      host: configService.get<string>('DATABASE_HOST', 'localhost'),
      port: Number(configService.get<string>('DATABASE_PORT', '5432')),
      name: configService.get<string>('DATABASE_NAME', 'film'),
      username: configService.get<string>('DATABASE_USERNAME', ''),
      password: configService.get<string>('DATABASE_PASSWORD', ''),
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}
