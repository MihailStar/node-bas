import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { NotFoundHandlerResponse } from './not-found.handler.d';

function notFoundHandler(req: Request, res: NotFoundHandlerResponse): void {
  res.status(StatusCodes.NOT_FOUND).send({ error: 'Endpoint not found' });
}

export { NotFoundHandlerResponse };
export default notFoundHandler;
