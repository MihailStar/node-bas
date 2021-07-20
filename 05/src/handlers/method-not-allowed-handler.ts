import { RequestHandler, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// TODO: выпилить

type HTTPRequestMethod =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

/** Controller handler */
function methodNotAllowedHandler(
  allowedMethods: HTTPRequestMethod[]
): RequestHandler {
  return function handler(
    req: Request,
    res: Response<{ message: string }>,
    next: NextFunction
  ): void {
    if (
      allowedMethods.concat('OPTIONS').includes(req.method as HTTPRequestMethod)
    ) {
      next();
      return;
    }

    res
      .set('Allow', allowedMethods.join(', '))
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ message: 'Method not allowed' });
  };
}

export { HTTPRequestMethod, methodNotAllowedHandler };
