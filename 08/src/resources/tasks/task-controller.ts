import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Board } from '../boards/board-entity';
import { Task, TaskDTO } from './task-entity';
import { TaskService } from './task-service';
import { HttpError } from '../../helpers/http-error';

class TaskConroller {
  public static async create(
    req: Request<
      { boardId: Board['id'] },
      ReturnType<typeof Task.toResponse>,
      TaskDTO
    >,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const taskOptions = req.body;
    const task = await TaskService.create({ ...taskOptions, boardId });

    res.status(StatusCodes.CREATED).json(Task.toResponse(task));

    // TODO: 400 - body requared
  }

  public static async readAll(
    _req: Request,
    res: Response<ReturnType<typeof Task.toResponse>[]>
  ): Promise<void> {
    const tasks = await TaskService.readAll();

    res.status(StatusCodes.OK).json(tasks.map(Task.toResponse));
  }

  public static async read(
    req: Request<{ boardId: Board['id']; taskId: Task['id'] }>,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { taskId } = req.params;
    const task = await TaskService.read(taskId);

    if (task === undefined) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));
  }

  public static async update(
    req: Request<
      { boardId: Board['id']; taskId: Task['id'] },
      ReturnType<typeof Task.toResponse>,
      TaskDTO
    >,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const { taskId } = req.params;
    const taskOptions = req.body;
    const task = await TaskService.update(taskId, { ...taskOptions, boardId });

    if (task === undefined) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));

    // TODO: 400 - body requared
  }

  public static async remove(
    req: Request<{ boardId: Board['id']; taskId: Task['id'] }>,
    res: Response<ReturnType<typeof Task.toResponse>>
  ): Promise<void> {
    const { taskId } = req.params;
    const task = await TaskService.remove(taskId);

    if (task === undefined) {
      throw new HttpError('Task not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Task.toResponse(task));
  }
}

export { TaskConroller };
