import { promisify } from 'util';
import { Transform, pipeline } from 'stream';
import { EOL } from 'os';
import fs from 'fs';

import options from './options';
import { EXIT_CODE } from './constants';
import { encode, decode } from './сaesar-cipher';

// TODO: вынести readStream, transformStream, writeStream

const readStream =
  typeof options.input === 'string'
    ? fs.createReadStream(options.input)
    : process.stdin;

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    try {
      callback(
        null,
        options.action === 'decode'
          ? decode(String(chunk), options.shift)
          : encode(String(chunk), options.shift)
      );
    } catch (error) {
      callback(error);
    }
  },
  final() {
    this.push(EOL);
  },
});

const writeStream =
  typeof options.output === 'string'
    ? fs.createWriteStream(options.output, { flags: 'a' })
    : process.stdout;

function pipelineErrorHandler(error: unknown): void {
  process.stderr.write(
    `error: something went wrong. ${
      error instanceof Error ? error.message : error
    }${EOL}`
  );

  process.exitCode = EXIT_CODE['Uncaught Fatal Exception'];
  process.exit();
}

promisify(pipeline)(readStream, transformStream, writeStream).catch(
  pipelineErrorHandler
);
