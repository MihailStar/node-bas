import { Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorHandlerResponse } from './error.handler.d';
import config from '../common/config';

function errorHandler(
  error: Error,
  req: Request,
  res: ErrorHandlerResponse,
  next: NextFunction
): void {
  if (config.NODE_ENV === 'production') {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: 'Internal server error' });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: String(error) });
}

export { ErrorHandlerResponse };
export default errorHandler;
