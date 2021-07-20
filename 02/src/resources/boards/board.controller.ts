import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import Board, { BoardOptions } from './board.model';
import BoardService from './board.service';

class BoardConroller {
  public static async create(
    req: Request<unknown, unknown, BoardOptions>,
    res: Response<ReturnType<typeof Board.toResponse>>
  ): Promise<void> {
    const boardOptions = req.body;
    const board = await BoardService.create(boardOptions);

    res.status(StatusCodes.CREATED).json(Board.toResponse(board));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async readAll(
    req: Request<unknown, unknown, unknown>,
    res: Response<ReturnType<typeof Board.toResponse>[]>
  ): Promise<void> {
    const boards = await BoardService.readAll();

    res.status(StatusCodes.OK).json(boards.map(Board.toResponse));

    // TODO: 401 - token not valid
  }

  public static async read(
    req: Request<{ boardId: Board['_id'] }, unknown, unknown>,
    res: Response<
      | ReturnType<typeof Board.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { boardId } = req.params;
    const board = await BoardService.read(boardId);

    if (board === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));

    // TODO: 401 - token not valid
  }

  public static async update(
    req: Request<{ boardId: Board['_id'] }, unknown, BoardOptions>,
    res: Response<
      | ReturnType<typeof Board.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { boardId } = req.params;
    const boardOptions = req.body;
    const board = await BoardService.update(boardId, boardOptions);

    if (board === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));

    // TODO: 400 - body requared
    // TODO: 401 - token not valid
  }

  public static async remove(
    req: Request<{ boardId: Board['_id'] }, unknown, unknown>,
    res: Response<
      | ReturnType<typeof Board.toResponse>
      | { message: ReturnType<typeof getReasonPhrase> }
    >
  ): Promise<void> {
    const { boardId } = req.params;
    const board = await BoardService.remove(boardId);

    if (board === null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
      return;
    }

    res.status(StatusCodes.OK).json(Board.toResponse(board));

    // TODO: 401 - token not valid
  }
}

export default BoardConroller;
