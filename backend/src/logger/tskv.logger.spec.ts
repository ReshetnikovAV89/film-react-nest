import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as TSKV string', () => {
    const result = logger.formatMessage('log', 'test message', 'context');

    expect(result).toBe(
      'level=log\tmessage=test message\toptionalParams=["context"]',
    );
  });

  it('should escape tab and line break characters', () => {
    const result = logger.formatMessage('log', 'line\nwith\ttab');

    expect(result).toBe(
      'level=log\tmessage=line\\nwith\\ttab\toptionalParams=[]',
    );
  });

  it('should write log message to console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message', 'context');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=log\tmessage=test message\toptionalParams=["context"]',
    );
  });

  it('should write error message to console.error', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('error message');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=error\tmessage=error message\toptionalParams=[]',
    );
  });

  it('should write warn message to console.warn', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('warn message');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=warn\tmessage=warn message\toptionalParams=[]',
    );
  });

  it('should write debug message to console.debug', () => {
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation();

    logger.debug('debug message');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=debug\tmessage=debug message\toptionalParams=[]',
    );
  });

  it('should write verbose message to console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.verbose('verbose message');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=verbose\tmessage=verbose message\toptionalParams=[]',
    );
  });
});
