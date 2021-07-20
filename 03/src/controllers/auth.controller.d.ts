import { Request, Response } from 'express';

import { UserCreationProps, UserInstance } from '../models/user.model';

type SignupResponseBody = { user: UserInstance; token: string };
type SignupResponse = Response<SignupResponseBody>;
type SignupRequestBody = { user: UserCreationProps };
type SignupRequest = Request<
  import('express-serve-static-core').ParamsDictionary,
  SignupResponseBody,
  SignupRequestBody
>;

type SigninResponseBody =
  | { user: UserInstance; token: string }
  | { error: string };
type SigninResponse = Response<SigninResponseBody>;
type SigninRequestBody = { user: Pick<UserInstance, 'username' | 'password'> };
type SigninRequest = Request<
  import('express-serve-static-core').ParamsDictionary,
  SigninResponseBody,
  SigninRequestBody
>;

export {
  SignupResponseBody,
  SignupResponse,
  SignupRequestBody,
  SignupRequest,
  SigninResponseBody,
  SigninResponse,
  SigninRequestBody,
  SigninRequest,
};
