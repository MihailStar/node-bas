import dotenv from 'dotenv';

import ExitCode from '../constants/exit-code';

dotenv.config();

const { NODE_ENV = 'development' } = process.env;
const config = {
  DB_HOST: '',
  DB: '',
  DB_USER: '',
  DB_PASS: '',
  PORT: '',
  SECRET: '',
};

const errorMessages: string[] = [];

Object.keys(config).forEach((parameterName) => {
  const parameterValue = process.env[parameterName];

  if (typeof parameterValue === 'undefined') {
    errorMessages.push(`- No parameter process.env.${parameterName}\n`);
    return;
  }

  config[parameterName as keyof typeof config] = parameterValue;
});

if (errorMessages.length > 0) {
  process.stderr.write(errorMessages.join(''));
  process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
}

const exportedСonfig = { NODE_ENV, ...config } as const;

export default exportedСonfig;
