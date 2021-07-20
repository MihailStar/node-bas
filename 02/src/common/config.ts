import dotenv from 'dotenv';

import ExitCode from '../constants/exit-code';

dotenv.config();

const { NODE_ENV, PORT } = process.env as {
  NODE_ENV: string | undefined;
  PORT: string;
};

if (typeof PORT === 'undefined') {
  process.stderr.write('No parameter process.env.PORT\n');
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  process.exit();
}

const config = {
  NODE_ENV: NODE_ENV ?? 'development',
  PORT: Number.parseInt(PORT, 10),
} as const;

export default config;
