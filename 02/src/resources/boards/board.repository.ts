import db from '../../bd';
import Board, { BoardOptions } from './board.model';

const { boards: boardsDb } = db;

class BoardRepository {
  public static async create(options: BoardOptions): Promise<Board> {
    const promise = new Promise<Board>((res, rej) => {
      boardsDb.insert(
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
        boardsDb.find({}, (error: Error | null, documents: Board[]) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(documents);
        });
      }

      boardsDb.findOne(
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
      boardsDb.update(
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

          boardsDb.findOne(
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
      boardsDb.findOne(
        { _id: boardId },
        (error: Error | null, document: Board | null) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (document === null) {
            res(null);
          }

          boardsDb.remove(
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

export default BoardRepository;
