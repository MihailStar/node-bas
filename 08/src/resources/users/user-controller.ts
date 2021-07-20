import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User, UserDTO } from './user-entity';
import { UserService } from './user-service';
import { HttpError } from '../../helpers/http-error';

class UserConroller {
  public static async create(
    req: Request<
      import('express-serve-static-core').ParamsDictionary,
      ReturnType<typeof User.toResponse>,
      UserDTO
    >,
    res: Response<ReturnType<typeof User.toResponse>>
  ): Promise<void> {
    try {
      const userOptions = req.body;
      const user = await UserService.create(userOptions);

      res.status(StatusCodes.CREATED).json(User.toResponse(user));
    } catch (error) {
      if (error.constraint === 'UQ_LOGIN') {
        throw new HttpError('Login exists', StatusCodes.BAD_REQUEST);
      }

      throw error;
    }

    // TODO: 400 - body requared
  }

  public static async readAll(
    _req: Request,
    res: Response<ReturnType<typeof User.toResponse>[]>
  ): Promise<void> {
    const users = await UserService.readAll();

    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  }

  public static async read(
    req: Request<{ userId: User['id'] }>,
    res: Response<ReturnType<typeof User.toResponse>>
  ): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.read(userId);

    if (user === undefined) {
      throw new HttpError('User not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));
  }

  public static async update(
    req: Request<
      { userId: User['id'] },
      ReturnType<typeof User.toResponse>,
      UserDTO
    >,
    res: Response<ReturnType<typeof User.toResponse>>
  ): Promise<void> {
    const { userId } = req.params;
    const userOptions = req.body;
    const user = await UserService.update(userId, userOptions);

    if (user === undefined) {
      throw new HttpError('User not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));

    // TODO: 400 - body requared
  }

  public static async remove(
    req: Request<{ userId: User['id'] }>,
    res: Response<ReturnType<typeof User.toResponse>>
  ): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.remove(userId);

    if (user === undefined) {
      throw new HttpError('User not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));
  }
}

export { UserConroller };
