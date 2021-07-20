import { createLogger, format, transports } from 'winston';

import { configuration } from '../common/configuration';

const LoggerLevel = {
  INFO: 'info',
  ERROR: 'error',
} as const;

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: LoggerLevel.INFO,
      filename: './logs/info-log.txt',
    }),
    new transports.File({
      level: LoggerLevel.ERROR,
      filename: './logs/error-log.txt',
    }),
  ],
});

if (configuration.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: LoggerLevel.INFO,
      format: format.prettyPrint(),
    })
  );
}

function log(
  level: typeof LoggerLevel[keyof typeof LoggerLevel],
  message: Record<string, unknown>
): void {
  logger[level](message);
}

export { LoggerLevel, log };
