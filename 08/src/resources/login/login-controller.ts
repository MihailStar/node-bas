import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

import { LoginDTO } from './login-entity';
import { UserService } from '../users/user-service';
import { HttpError } from '../../helpers/http-error';
import { configuration } from '../../common/configuration';

class LoginConroller {
  public static async register(
    req: Request<
      import('express-serve-static-core').ParamsDictionary,
      { token: string },
      LoginDTO
    >,
    res: Response<{ token: string }>
  ): Promise<void> {
    const loginOptions = req.body;
    const user = await UserService.readByLogin(loginOptions.login);

    if (
      user === undefined ||
      !bcrypt.compareSync(loginOptions.password, user.password)
    ) {
      throw new HttpError('User not found', StatusCodes.FORBIDDEN);
    }

    const token = jsonwebtoken.sign(
      { login: user.login, userId: user.id },
      configuration.SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(StatusCodes.OK).json({ token });

    // TODO: 400 - body requared
  }
}

export { LoginConroller };
