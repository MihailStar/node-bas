import { StatusCodes } from 'http-status-codes';

// Альтернатива: пакет http-errors

class HttpError extends Error {
  public readonly statusCode: StatusCodes;

  public constructor(message: string, statusCode?: StatusCodes) {
    super();

    this.message = message;
    this.name = 'HttpError';
    this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export { HttpError };
