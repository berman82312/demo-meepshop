export interface LoggerInterface {
  log (message?: any, ...optionalParams: any[]): void;
  trace (message?: any, ...optionalParams: any[]): void;
  debug (message?: any, ...optionalParams: any[]): void;
  info (message?: any, ...optionalParams: any[]): void;
  warn (message?: any, ...optionalParams: any[]): void;
  error (message?: any, ...optionalParams: any[]): void;
}

export class Logger {
  logger: LoggerInterface
  constructor(logger?: LoggerInterface) {
    this.logger = logger ?? console
  }

  log (...args: any[]) {
    this.logger.log(...args)
  }
  trace (...args: any[]) {
    this.logger.trace(...args)
  }
  debug (...args: any[]) {
    this.logger.debug(...args)
  }
  info (...args: any[]) {
    this.logger.info(...args)
  }
  warn (...args: any[]) {
    this.logger.warn(...args)
  }
  error (...args: any[]) {
    this.logger.error(...args)
  }
}

export default new Logger()