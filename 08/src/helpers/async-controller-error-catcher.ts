import { Request, Response, NextFunction } from 'express';

function asyncControllerErrorCatcher<
  Req extends Request,
  Res extends Response,
  NextFunc extends NextFunction
>(
  asyncController: (req: Req, res: Res, next?: NextFunc) => Promise<void>
): (req: Req, res: Res, next: NextFunc) => Promise<void> {
  return async function wrappedAsyncController(
    req: Req,
    res: Res,
    next: NextFunc
  ): Promise<void> {
    try {
      await asyncController(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { asyncControllerErrorCatcher };
