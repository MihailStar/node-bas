import dotenv from 'dotenv';
import { EOL } from 'os';

dotenv.config();

const environmentKeys = [
  'DB_HOST',
  'DB_NAME',
  'DB_PASS',
  'DB_USER',
  'NODE_ENV',
  'PORT',
] as const;
const environmentVariables = {} as Record<
  typeof environmentKeys[Exclude<keyof typeof environmentKeys, keyof []>],
  string
>;

environmentKeys.forEach((environmentKey) => {
  const environmentValue = process.env[environmentKey];

  if (typeof environmentValue === 'undefined') {
    throw new Error(`Variable process.env.${environmentKey} not found${EOL}`);
  }

  environmentVariables[environmentKey] = environmentValue;
});

const configuration = {
  ...environmentVariables,
  PORT: Number.parseInt(environmentVariables.PORT, 10),
} as const;

export { configuration };
