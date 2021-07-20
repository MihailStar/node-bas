import { Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';

import { ValidateSessionResponse } from './validate-session.middleware.d';
import { fromJWT } from '../utilities/jwt';
import UserModel from '../models/user.model';

async function validateSession(
  req: Request,
  res: ValidateSessionResponse,
  next: NextFunction
): Promise<void> {
  try {
    if (req.method === 'OPTIONS') {
      next();
      return;
    }

    if (req.headers.authorization === undefined) {
      res.status(StatusCodes.FORBIDDEN).send({ error: 'Token not found' });
      return;
    }

    const payload = await fromJWT<{ readonly id: number }>(
      req.headers.authorization
    );
    const user = await UserModel.findOne({ where: { id: payload.id } });

    if (user === null) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found' });
      return;
    }

    res.locals.user = user;
    next();
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof NotBeforeError ||
      error instanceof TokenExpiredError
    ) {
      res.status(StatusCodes.FORBIDDEN).send({ error: 'Token not valid' });
      return;
    }

    next(error);
  }
}

export { ValidateSessionResponse };
export default validateSession;
