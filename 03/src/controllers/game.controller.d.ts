import { Request, Response } from 'express';

import { GameCreationProps, GameInstance } from '../models/game.model';
import { UserInstance } from '../models/user.model';

type createResponseBody = { game: GameInstance };
type createResponse = Response<createResponseBody, { user: UserInstance }>;
type createRequestBody = { game: GameCreationProps };
type createRequest = Request<
  import('express-serve-static-core').ParamsDictionary,
  createResponseBody,
  createRequestBody
>;

type readAllResponseBody = { games: GameInstance[] } | { error: string };
type readAllResponse = Response<readAllResponseBody, { user: UserInstance }>;
type readAllRequest = Request<
  import('express-serve-static-core').ParamsDictionary,
  readAllResponseBody
>;

type readResponseBody = { game: GameInstance } | { error: string };
type readResponse = Response<readResponseBody, { user: UserInstance }>;
type readRequestParams = { gameId: number };
type readRequest = Request<readRequestParams, readResponseBody>;

type updateResponseBody = { game: GameInstance } | { error: string };
type updateResponse = Response<updateResponseBody, { user: UserInstance }>;
type updateRequestParams = { gameId: number };
type updateRequest = Request<updateRequestParams, updateResponseBody>;

type removeResponseBody = { game: GameInstance } | { error: string };
type removeResponse = Response<removeResponseBody, { user: UserInstance }>;
type removeRequestParams = { gameId: number };
type removeRequest = Request<removeRequestParams, removeResponseBody>;

export {
  createResponseBody,
  createResponse,
  createRequestBody,
  createRequest,
  readAllResponseBody,
  readAllResponse,
  readAllRequest,
  readResponseBody,
  readResponse,
  readRequestParams,
  readRequest,
  updateResponseBody,
  updateResponse,
  updateRequestParams,
  updateRequest,
  removeResponseBody,
  removeResponse,
  removeRequestParams,
  removeRequest,
};
