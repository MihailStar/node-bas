import { Response } from 'express';

import { UserInstance } from '../models/user.model';

type ValidateSessionResponseBody = { error: string };
type ValidateSessionResponseLocals = { user: UserInstance };
type ValidateSessionResponse = Response<
  ValidateSessionResponseBody,
  ValidateSessionResponseLocals
>;

export {
  ValidateSessionResponseBody,
  ValidateSessionResponseLocals,
  ValidateSessionResponse,
};
