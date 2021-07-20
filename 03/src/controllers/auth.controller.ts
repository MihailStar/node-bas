import { NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
} from './auth.controller.d';
import UserModel from '../models/user.model';
import { toJWT } from '../utilities/jwt';

const authController = {
  async signup(
    req: SignupRequest,
    res: SignupResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const hashedPassword = await bcryptjs.hash(req.body.user.password, 10);
      const user = await UserModel.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        password: hashedPassword,
        email: req.body.user.email,
      });
      const token = await toJWT({ id: user.id });

      res.status(StatusCodes.CREATED).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  async signin(
    req: SigninRequest,
    res: SigninResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({
        where: { username: req.body.user.username },
      });

      if (user === null) {
        res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found' });
        return;
      }

      const isPasswordValid = await bcryptjs.compare(
        req.body.user.password,
        user.password
      );

      if (!isPasswordValid) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Passwords not match' });
        return;
      }

      const token = await toJWT({ id: user.id });

      res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  },
} as const;

export { SignupRequest, SignupResponse, SigninRequest, SigninResponse };
export default authController;
