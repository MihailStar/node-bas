import { BoardOptions, Board } from './board-model';
import { BoardRepository } from './board-repository';
import { TaskService } from '../tasks/task-service';

class BoardService {
  public static async create(options: BoardOptions): Promise<Board> {
    const board = await BoardRepository.create(options);

    return board;
  }

  public static async readAll(): Promise<Board[]> {
    const boards = await BoardRepository.read();

    return boards;
  }

  public static async read(boardId: Board['_id']): Promise<Board | null> {
    const board = await BoardRepository.read(boardId);

    return board;
  }

  public static async update(
    boardId: Board['_id'],
    options: BoardOptions
  ): Promise<Board | null> {
    const board = await BoardRepository.update(boardId, options);

    if (board === null) {
      return null;
    }

    return board;
  }

  public static async remove(boardId: Board['_id']): Promise<Board | null> {
    const board = await BoardRepository.remove(boardId);

    if (board === null) {
      return null;
    }

    await TaskService.removeMany({ boardId });

    return board;
  }
}

export { BoardService };
