import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

function createLogger(loggerType?: string): LoggerService {
  switch (loggerType) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    case 'dev':
    default:
      return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const loggerType = configService.get<string>('LOGGER_TYPE', 'dev');

  app.useLogger(createLogger(loggerType));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  await app.listen(port);
}

bootstrap();
