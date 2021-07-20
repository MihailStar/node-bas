import { Router } from 'express';

import UserConroller from './user.controller';

const userRouter = Router();

userRouter
  .route('/')
  .post(UserConroller.create)
  .get(UserConroller.readAll);

userRouter
  .route('/:userId/')
  .get(UserConroller.read)
  .put(UserConroller.update)
  .delete(UserConroller.remove);

export default userRouter;
