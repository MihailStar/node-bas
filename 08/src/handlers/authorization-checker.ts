import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

import { HttpError } from '../helpers/http-error';
import { configuration } from '../common/configuration';

function authorizationChecker(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    throw new HttpError('Token not found', StatusCodes.UNAUTHORIZED);
  }

  const token = authorization.split(' ')[1] ?? '';

  try {
    jsonwebtoken.verify(token, configuration.SECRET);
    next();
  } catch (error) {
    throw new HttpError('Token not valid', StatusCodes.UNAUTHORIZED);
  }
}

export { authorizationChecker };
