import { Router } from 'express';

import { asyncControllerErrorCatcher } from '../../helpers/async-controller-error-catcher';
import { BoardConroller } from './board-controller';

const boardRouter = Router();

boardRouter
  .route('/')
  .post(asyncControllerErrorCatcher(BoardConroller.create))
  .get(asyncControllerErrorCatcher(BoardConroller.readAll));

boardRouter
  .route('/:boardId/')
  .get(asyncControllerErrorCatcher(BoardConroller.read))
  .put(asyncControllerErrorCatcher(BoardConroller.update))
  .delete(asyncControllerErrorCatcher(BoardConroller.remove));

export { boardRouter };
