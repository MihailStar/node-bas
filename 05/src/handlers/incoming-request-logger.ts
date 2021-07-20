import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

import { log, LoggerLevel } from '../helpers/logger';

/** Controller handler */
function incomingRequestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { originalUrl, query, body } = req;

  next();

  finished(res, () => {
    const { statusCode } = res;

    log(LoggerLevel.INFO, {
      type: 'Incoming request',
      url: originalUrl,
      queryParameters: query,
      body,
      statusCode,
    });
  });
}

export { incomingRequestLogger };
