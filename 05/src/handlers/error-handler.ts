import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { configuration } from '../common/configuration';
import { log, LoggerLevel } from '../helpers/logger';

/** Controller handler */
function errorHandler(
  error: Parameters<import('express-serve-static-core').ErrorRequestHandler>[0],
  _req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message:
      configuration.NODE_ENV === 'production'
        ? 'Internal server error'
        : String(error),
  });

  log(LoggerLevel.ERROR, {
    type: 'Exception',
    error: String(error),
  });
}

export { errorHandler };
