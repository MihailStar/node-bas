import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/** Controller handler */
function endpointNotFoundHandler(
  _req: Request,
  res: Response<{ message: string }>
): void {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Endpoint not found' });
}

export { endpointNotFoundHandler };
