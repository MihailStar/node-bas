import { getRepository } from 'typeorm';

import { BoardDTO, Board } from './board-entity';

class BoardRepository {
  public static async create(options: BoardDTO): Promise<Board> {
    const createdBoard = getRepository(Board).create(options);

    return getRepository(Board).save(createdBoard);
  }

  public static async read(): Promise<Board[]>;
  public static async read(boardId: Board['id']): Promise<Board | undefined>;
  public static async read(
    boardId?: Board['id']
  ): Promise<Board[] | Board | undefined> {
    if (boardId === undefined) {
      return getRepository(Board).find();
    }

    return getRepository(Board).findOne(boardId);
  }

  public static async update(
    boardId: Board['id'],
    options: BoardDTO
  ): Promise<Board | undefined> {
    const board = await getRepository(Board).findOne(boardId);

    if (board === undefined) {
      return undefined;
    }

    const updatedBoard = getRepository(Board).merge(board, options);

    return getRepository(Board).save(updatedBoard);
  }

  public static async remove(boardId: Board['id']): Promise<Board | undefined> {
    const board = await getRepository(Board).findOne(boardId);

    if (board === undefined) {
      return undefined;
    }

    return getRepository(Board).remove(board);
  }
}

export { BoardRepository };
