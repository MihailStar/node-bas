import { Router } from 'express';

import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter
  .post('/signup/', authController.signup)
  .post('/signin/', authController.signin);

export default authRouter;
