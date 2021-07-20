import { Response } from 'express';

type ErrorHandlerResponseBody = { error: string };
type ErrorHandlerResponse = Response<ErrorHandlerResponseBody>;

export { ErrorHandlerResponseBody, ErrorHandlerResponse };
