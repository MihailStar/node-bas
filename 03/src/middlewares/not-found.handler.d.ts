import { Response } from 'express';

type NotFoundHandlerResponseBody = { error: string };
type NotFoundHandlerResponse = Response<NotFoundHandlerResponseBody>;

export { NotFoundHandlerResponseBody, NotFoundHandlerResponse };
