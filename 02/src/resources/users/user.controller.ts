import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import User, { UserOptions } from './user.model';
import UserService from './user.service';

class UserConroller {
  public static async create(
    req: Request<unknown, unknown, UserOptions>,
    res: Response<ReturnType<typeof User.toResponse>>
  ): Promise<void> {
    const userOptions = req.body;
    const user = await UserService.create(userOptions);

    res.status(StatusCodes.CREATED).json(User.toResponse(user));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async readAll(
    req: Request<unknown, unknown, unknown>,
    res: Response<ReturnType<typeof User.toResponse>[]>
  ): Promise<void> {
    const users = await UserService.readAll();

    res.status(StatusCodes.OK).json(users.map(User.toResponse));

    // TODO: 401 - token not valid
  }

  public static async read(
    req: Request<{ userId: User['_id'] }, unknown, unknown>,
    res: Response<
      | ReturnType<typeof User.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.read(userId);

    if (user === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));

    // TODO: 401 - token not valid
  }

  public static async update(
    req: Request<{ userId: User['_id'] }, unknown, UserOptions>,
    res: Response<
      | ReturnType<typeof User.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { userId } = req.params;
    const userOptions = req.body;
    const user = await UserService.update(userId, userOptions);

    if (user === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async remove(
    req: Request<{ userId: User['_id'] }, unknown, unknown>,
    res: Response<
      | ReturnType<typeof User.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.remove(userId);

    if (user === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(User.toResponse(user));

    // TODO: 401 - token not valid
  }
}

export default UserConroller;
