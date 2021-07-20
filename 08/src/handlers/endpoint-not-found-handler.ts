import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function endpointNotFoundHandler(
  _req: Request,
  res: Response<{ message: string }>
): void {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Endpoint not found' });
}

export { endpointNotFoundHandler };
