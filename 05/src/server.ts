import { EOL } from 'os';

import { log, LoggerLevel } from './helpers/logger';
import { ExitCode } from './helpers/exit-code';
import { createApp } from './app';
import { configuration } from './common/configuration';

process.on('uncaughtException', (error) => {
  log(LoggerLevel.ERROR, {
    type: 'Uncaught exception',
    error: String(error),
  });
  process.stderr.write(`Error: Uncaught exception${EOL}`);
  process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
});

process.on('unhandledRejection', (reason) => {
  log(LoggerLevel.ERROR, {
    type: 'Unhandled rejection',
    error: String(reason),
  });
  process.stderr.write(`Error: Unhandled rejection${EOL}`);
  process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
});

const app = createApp();

app.listen(configuration.PORT, () => {
  process.stdout.write(`Info: Application started${EOL}`);

  if (configuration.NODE_ENV !== 'production') {
    process.stdout.write(`Info: http://localhost:${configuration.PORT}${EOL}`);
  }
});

export { app };
