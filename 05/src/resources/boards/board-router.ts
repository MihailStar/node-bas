import { Router } from 'express';

import { asyncFuncWrapper } from '../../helpers/async-func-wrapper';
import { BoardConroller } from './board-controller';

const boardRouter = Router();

boardRouter
  .route('/')
  .post(asyncFuncWrapper(BoardConroller.create))
  .get(asyncFuncWrapper(BoardConroller.readAll));

boardRouter
  .route('/:boardId/')
  .get(asyncFuncWrapper(BoardConroller.read))
  .put(asyncFuncWrapper(BoardConroller.update))
  .delete(asyncFuncWrapper(BoardConroller.remove));

export { boardRouter };
