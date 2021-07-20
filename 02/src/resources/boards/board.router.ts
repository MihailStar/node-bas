import { Router } from 'express';

import BoardConroller from './board.controller';

const boardRouter = Router();

boardRouter
  .route('/')
  .post(BoardConroller.create)
  .get(BoardConroller.readAll);

boardRouter
  .route('/:boardId/')
  .get(BoardConroller.read)
  .put(BoardConroller.update)
  .delete(BoardConroller.remove);

export default boardRouter;
