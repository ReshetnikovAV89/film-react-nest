import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as JSON string', () => {
    const result = logger.formatMessage('log', 'test message', 'context');

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'test message',
        optionalParams: ['context'],
      }),
    );
  });

  it('should write log message to console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message', 'context');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'test message',
        optionalParams: ['context'],
      }),
    );
  });

  it('should write error message to console.error', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('error message', 'stack trace');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'error message',
        optionalParams: ['stack trace'],
      }),
    );
  });

  it('should write warn message to console.warn', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('warn message');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: 'warn message',
        optionalParams: [],
      }),
    );
  });

  it('should write debug message to console.debug', () => {
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation();

    logger.debug('debug message');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'debug',
        message: 'debug message',
        optionalParams: [],
      }),
    );
  });

  it('should write verbose message to console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.verbose('verbose message');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'verbose',
        message: 'verbose message',
        optionalParams: [],
      }),
    );
  });
});
