import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Board, BoardDTO } from './board-entity';
import { BoardService } from './board-service';
import { HttpError } from '../../helpers/http-error';

class BoardConroller {
  public static async create(
    req: Request<
      import('express-serve-static-core').ParamsDictionary,
      ReturnType<typeof Board.toResponse>,
      BoardDTO
    >,
    res: Response<ReturnType<typeof Board.toResponse>>
  ): Promise<void> {
    const boardOptions = req.body;
    const board = await BoardService.create(boardOptions);

    res.status(StatusCodes.CREATED).json(Board.toResponse(board));

    // TODO: 400 - body requared
  }

  public static async readAll(
    _req: Request,
    res: Response<ReturnType<typeof Board.toResponse>[]>
  ): Promise<void> {
    const boards = await BoardService.readAll();

    res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
  }

  public static async read(
    req: Request<{ boardId: Board['id'] }>,
    res: Response<ReturnType<typeof Board.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const board = await BoardService.read(boardId);

    if (board === undefined) {
      throw new HttpError('Board not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));
  }

  public static async update(
    req: Request<
      { boardId: Board['id'] },
      ReturnType<typeof Board.toResponse>,
      BoardDTO
    >,
    res: Response<ReturnType<typeof Board.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const boardOptions = req.body;
    const board = await BoardService.update(boardId, boardOptions);

    if (board === undefined) {
      throw new HttpError('Board not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));

    // TODO: 400 - body requared
  }

  public static async remove(
    req: Request<{ boardId: Board['id'] }>,
    res: Response<ReturnType<typeof Board.toResponse>>
  ): Promise<void> {
    const { boardId } = req.params;
    const board = await BoardService.remove(boardId);

    if (board === undefined) {
      throw new HttpError('Board not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));
  }
}

export { BoardConroller };
