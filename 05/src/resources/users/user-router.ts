import { Router } from 'express';

import { asyncFuncWrapper } from '../../helpers/async-func-wrapper';
import { UserConroller } from './user-controller';

const userRouter = Router();

userRouter
  .route('/')
  .post(asyncFuncWrapper(UserConroller.create))
  .get(asyncFuncWrapper(UserConroller.readAll));

userRouter
  .route('/:userId/')
  .get(asyncFuncWrapper(UserConroller.read))
  .put(asyncFuncWrapper(UserConroller.update))
  .delete(asyncFuncWrapper(UserConroller.remove));

export { userRouter };
