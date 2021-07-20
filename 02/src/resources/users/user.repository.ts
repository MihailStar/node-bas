import db from '../../bd';
import User, { UserOptions } from './user.model';

const { users: usersDb } = db;

class UserRepository {
  public static async create(options: UserOptions): Promise<User> {
    const promise = new Promise<User>((res, rej) => {
      usersDb.insert(
        new User(options),
        (error: Error | null, document: User) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(document);
        }
      );
    });

    return promise;
  }

  public static async read(): Promise<User[]>;
  public static async read(userId: User['_id']): Promise<User | null>;
  public static async read(
    userId?: User['_id']
  ): Promise<User[] | User | null> {
    const promise = new Promise<User[] | User | null>((res, rej) => {
      if (typeof userId === 'undefined') {
        usersDb.find({}, (error: Error | null, documents: User[]) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(documents);
        });
      }

      usersDb.findOne(
        { _id: userId },
        (error: Error | null, document: User | null) => {
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
    userId: User['_id'],
    options: UserOptions
  ): Promise<User | null> {
    const promise = new Promise<User | null>((res, rej) => {
      usersDb.update(
        { _id: userId },
        options,
        {},
        (error: Error | null, updated: number) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (updated === 0) {
            res(null);
          }

          usersDb.findOne(
            { _id: userId },
            (errorInFind: Error | null, document: User | null) => {
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

  public static async remove(userId: User['_id']): Promise<User | null> {
    const promise = new Promise<User | null>((res, rej) => {
      usersDb.findOne(
        { _id: userId },
        (error: Error | null, document: User | null) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (document === null) {
            res(null);
          }

          usersDb.remove({ _id: userId }, {}, (errorInRemove: Error | null) => {
            if (errorInRemove instanceof Error) {
              rej(error);
            }

            res(document);
          });
        }
      );
    });

    return promise;
  }
}

export default UserRepository;
