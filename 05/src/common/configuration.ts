import dotenv from 'dotenv';
import { EOL } from 'os';

import { ExitCode } from '../helpers/exit-code';

dotenv.config();

const environmentKeys = ['NODE_ENV', 'PORT'] as const;
const environmentVariables = {} as Record<
  typeof environmentKeys[Exclude<keyof typeof environmentKeys, keyof []>],
  string
>;

environmentKeys.forEach((environmentKey) => {
  const environmentValue = process.env[environmentKey];

  if (typeof environmentValue === 'undefined') {
    process.stderr.write(
      `Error: Variable process.env.${environmentKey} not found${EOL}`
    );
    process.exit(ExitCode.INVALID_ARGUMENT);
  }

  environmentVariables[environmentKey] = environmentValue;
});

const configuration = {
  ...environmentVariables,
  PORT: Number.parseInt(environmentVariables.PORT, 10),
} as const;

export { configuration };
