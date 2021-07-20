import { Request, Response, NextFunction } from 'express';

// TODO: Переименовать, аля asynchronousControllerErrorHandler

/** Wraps async function with try...catch */
function asyncFuncWrapper<
  Req extends Request,
  Res extends Response,
  NextFunc extends NextFunction
>(
  asyncFunc: (req: Req, res: Res, next?: NextFunc) => Promise<void>
): (req: Req, res: Res, next: NextFunc) => Promise<void> {
  return async function wrappedAsyncFunc(
    req: Req,
    res: Res,
    next: NextFunc
  ): Promise<void> {
    try {
      await asyncFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { asyncFuncWrapper };
