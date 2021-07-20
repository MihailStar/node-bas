import { InvalidOptionArgumentError, Command as Commander } from 'commander';
import fs from 'fs';

import { Action } from './сaesar-cipher';
import { EXIT_CODE } from './constants';

type Options = Readonly<{
  action: Action;
  shift: number;
  input?: string;
  output?: string;
}>;

const OptionHandler: {
  readonly [P in keyof Required<Options>]: (
    value: string
  ) => Required<Options>[P];
} = {
  action(value: string): Action {
    if (!/^(?:encode|decode)$/.test(value)) {
      process.exitCode = EXIT_CODE['Invalid Argument'];

      throw new InvalidOptionArgumentError('Must be encode or decode');
    }

    return value as Action;
  },

  shift(value: string): number {
    if (!/^-?\d+$/.test(value)) {
      process.exitCode = EXIT_CODE['Invalid Argument'];

      throw new InvalidOptionArgumentError('Мust be an integer');
    }

    return Number.parseInt(value, 10);
  },

  input(value: string): string {
    try {
      fs.accessSync(value, fs.constants.F_OK | fs.constants.R_OK);
    } catch (error) {
      process.exitCode = EXIT_CODE['Invalid Argument'];

      throw new InvalidOptionArgumentError(
        'Must exist. Must have read permissions'
      );
    }

    return value;
  },

  output(value: string): string {
    try {
      fs.accessSync(value, fs.constants.F_OK | fs.constants.W_OK);
    } catch (error) {
      process.exitCode = EXIT_CODE['Invalid Argument'];

      throw new InvalidOptionArgumentError(
        'Must exist. Must have write permissions'
      );
    }

    return value;
  },
} as const;

const program = new Commander();

program
  .configureHelp({
    commandUsage() {
      return 'node сaesar-cipher-cli <options>';
    },
  })
  .requiredOption('-a, --action <encode | decode>', 'required', OptionHandler.action)
  .requiredOption('-s, --shift <integer>', 'required', OptionHandler.shift)
  .option('-i, --input <path to file>', 'optional', OptionHandler.input)
  .option('-o, --output <path to file>', 'optional', OptionHandler.output)
  .parse(process.argv);

const option = program.opts() as Options;

export { Options };
export default option;
