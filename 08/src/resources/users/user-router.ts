import { Router } from 'express';

import { asyncControllerErrorCatcher } from '../../helpers/async-controller-error-catcher';
import { UserConroller } from './user-controller';

const userRouter = Router();

userRouter
  .route('/')
  .post(asyncControllerErrorCatcher(UserConroller.create))
  .get(asyncControllerErrorCatcher(UserConroller.readAll));

userRouter
  .route('/:userId/')
  .get(asyncControllerErrorCatcher(UserConroller.read))
  .put(asyncControllerErrorCatcher(UserConroller.update))
  .delete(asyncControllerErrorCatcher(UserConroller.remove));

export { userRouter };
