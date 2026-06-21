import { Injectable, LoggerService } from '@nestjs/common';

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: unknown): string {
    return String(value)
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  }

  formatMessage(
    level: LogLevel,
    message: unknown,
    ...optionalParams: unknown[]
  ): string {
    const fields = [
      ['level', level],
      ['message', this.escapeValue(message)],
      ['optionalParams', this.escapeValue(JSON.stringify(optionalParams))],
    ];

    return fields.map(([key, value]) => `${key}=${value}`).join('\t');
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
