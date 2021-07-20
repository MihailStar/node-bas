import { EOL } from 'os';
import { createConnection } from 'typeorm';
import path from 'path';

import { log, LoggerLevel } from './helpers/logger';
import { ExitCode } from './helpers/exit-code';
import { configuration } from './common/configuration';
import { createApp } from './app';

process.on('uncaughtException', (error) => {
  log(LoggerLevel.ERROR, {
    type: 'Uncaught exception',
    error:
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error,
  });

  process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
});

process.on('unhandledRejection', (reason) => {
  log(LoggerLevel.ERROR, {
    type: 'Unhandled rejection',
    error:
      reason instanceof Error
        ? { name: reason.name, message: reason.message, stack: reason.stack }
        : reason,
  });

  process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
});

async function bootstrap() {
  await createConnection({
    type: 'postgres',
    host: configuration.DB_HOST,
    database: configuration.DB_NAME,
    username: configuration.DB_USER,
    password: configuration.DB_PASS,
    entities: [path.join(__dirname, './resources/**/*[-.]entity.[jt]s')],
    synchronize: true,
  });

  process.stdout.write(`Database connected${EOL}`);

  const app = createApp();

  app.listen(configuration.PORT, () => {
    process.stdout.write(`Application started${EOL}`);

    if (configuration.NODE_ENV === 'development') {
      process.stdout.write(`http://localhost:${configuration.PORT}${EOL}`);
    }
  });
}

bootstrap();
