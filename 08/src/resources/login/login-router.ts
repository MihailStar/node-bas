import { Router } from 'express';

import { asyncControllerErrorCatcher } from '../../helpers/async-controller-error-catcher';
import { LoginConroller } from './login-controller';

const loginRouter = Router();

loginRouter
  .route('/')
  .post(asyncControllerErrorCatcher(LoginConroller.register));

export { loginRouter };
