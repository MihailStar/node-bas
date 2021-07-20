import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Board } from '../boards/board-model';
import { Task, TaskOptions } from './task-model';
import { TaskService } from './task-service';
import { HttpError } from '../../helpers/http-error';

class TaskConroller {
  public static async create(
    req: Request<
      { boardId: Board['_id'] },
      ReturnType<typeof Task.toResponse>,
      TaskOptions
    >,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const taskOptions = req.body;
    const task = await TaskService.create({ ...taskOptions, boardId });

    res.status(StatusCodes.CREATED).json(Task.toResponse(task));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async readAll(
    _req: Request,
    res: Response<ReturnType<typeof Task.toResponse>[]>
  ): Promise<void> {
    const tasks = await TaskService.readAll();

    res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));

    // TODO: 401 - token not valid
  }

  public static async read(
    req: Request<{ boardId: Board['_id']; taskId: Task['_id'] }>,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { taskId } = req.params;
    const task = await TaskService.read(taskId);

    if (task === null) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));

    // TODO: 401 - token not valid
  }

  public static async update(
    req: Request<
      { boardId: Board['_id']; taskId: Task['_id'] },
      ReturnType<typeof Task.toResponse>,
      TaskOptions
    >,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const { taskId } = req.params;
    const taskOptions = req.body;
    const task = await TaskService.update(taskId, { ...taskOptions, boardId });

    if (task === null) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async remove(
    req: Request<{ boardId: Board['_id']; taskId: Task['_id'] }>,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { taskId } = req.params;
    const task = await TaskService.remove(taskId);

    if (task === null) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));

    // TODO: 401 - token not valid
  }
}

export { TaskConroller };
