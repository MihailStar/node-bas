import { db } from '../../bd';
import { BoardOptions, Board } from './board-model';

class BoardRepository {
  public static async create(options: BoardOptions): Promise<Board> {
    const promise = new Promise<Board>((res, rej) => {
      db.boards.insert(
        new Board(options),
        (error: Error | null, document: Board) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(document);
        }
      );
    });

    return promise;
  }

  public static async read(): Promise<Board[]>;
  public static async read(boardId: Board['_id']): Promise<Board | null>;
  public static async read(
    boardId?: Board['_id']
  ): Promise<Board[] | Board | null> {
    const promise = new Promise<Board[] | Board | null>((res, rej) => {
      if (typeof boardId === 'undefined') {
        db.boards.find({}, (error: Error | null, documents: Board[]) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(documents);
        });
      }

      db.boards.findOne(
        { _id: boardId },
        (error: Error | null, document: Board | null) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(document);
        }
      );
    });

    return promise;
  }

  public static async update(
    boardId: Board['_id'],
    options: BoardOptions
  ): Promise<Board | null> {
    const promise = new Promise<Board | null>((res, rej) => {
      db.boards.update(
        { _id: boardId },
        options,
        {},
        (error: Error | null, updated: number) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (updated === 0) {
            res(null);
          }

          db.boards.findOne(
            { _id: boardId },
            (errorInFind: Error | null, document: Board | null) => {
              if (errorInFind instanceof Error) {
                rej(errorInFind);
              }

              res(document);
            }
          );
        }
      );
    });

    return promise;
  }

  public static async remove(boardId: Board['_id']): Promise<Board | null> {
    const promise = new Promise<Board | null>((res, rej) => {
      db.boards.findOne(
        { _id: boardId },
        (error: Error | null, document: Board | null) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (document === null) {
            res(null);
          }

          db.boards.remove(
            { _id: boardId },
            {},
            (errorInRemove: Error | null) => {
              if (errorInRemove instanceof Error) {
                rej(error);
              }

              res(document);
            }
          );
        }
      );
    });

    return promise;
  }
}

export { BoardRepository };
