import { BoardDTO, Board } from './board-entity';
import { BoardRepository } from './board-repository';
import { TaskService } from '../tasks/task-service';

class BoardService {
  public static async create(options: BoardDTO): Promise<Board> {
    return BoardRepository.create(options);
  }

  public static async readAll(): Promise<Board[]> {
    return BoardRepository.read();
  }

  public static async read(boardId: Board['id']): Promise<Board | undefined> {
    return BoardRepository.read(boardId);
  }

  public static async update(
    boardId: Board['id'],
    options: BoardDTO
  ): Promise<Board | undefined> {
    return BoardRepository.update(boardId, options);
  }

  public static async remove(boardId: Board['id']): Promise<Board | undefined> {
    await TaskService.removeMany({ boardId });

    return BoardRepository.remove(boardId);
  }
}

export { BoardService };
