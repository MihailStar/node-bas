import db from '../../bd';
import Task, { TaskOptions } from './task.model';

const { tasks: tasksDb } = db;

class TaskRepository {
  public static async create(options: TaskOptions): Promise<Task> {
    const promise = new Promise<Task>((res, rej) => {
      tasksDb.insert(
        new Task(options),
        (error: Error | null, document: Task) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(document);
        }
      );
    });

    return promise;
  }

  public static async read(): Promise<Task[]>;
  public static async read(taskId: Task['_id']): Promise<Task | null>;
  public static async read(
    taskId?: Task['_id']
  ): Promise<Task[] | Task | null> {
    const promise = new Promise<Task[] | Task | null>((res, rej) => {
      if (typeof taskId === 'undefined') {
        tasksDb.find({}, (error: Error | null, documents: Task[]) => {
          if (error instanceof Error) {
            rej(error);
          }

          res(documents);
        });
      }

      tasksDb.findOne(
        { _id: taskId },
        (error: Error | null, document: Task | null) => {
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
    taskId: Task['_id'],
    options: TaskOptions
  ): Promise<Task | null> {
    const promise = new Promise<Task | null>((res, rej) => {
      tasksDb.update(
        { _id: taskId },
        options,
        {},
        (error: Error | null, updated: number) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (updated === 0) {
            res(null);
          }

          tasksDb.findOne(
            { _id: taskId },
            (errorInFind: Error | null, document: Task | null) => {
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

  public static async updateMany(
    searchOption: Partial<Task>,
    updateOption: Partial<Task>
  ): Promise<boolean> {
    const promise = new Promise<boolean>((res, rej) => {
      tasksDb.update(
        searchOption,
        updateOption,
        { multi: true },
        (error: Error | null, updated: number) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (updated === 0) {
            res(false);
          }

          res(true);
        }
      );
    });

    return promise;
  }

  public static async remove(taskId: Task['_id']): Promise<Task | null> {
    const promise = new Promise<Task | null>((res, rej) => {
      tasksDb.findOne(
        { _id: taskId },
        (error: Error | null, document: Task | null) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (document === null) {
            res(null);
          }

          tasksDb.remove({ _id: taskId }, {}, (errorInRemove: Error | null) => {
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

  public static async removeMany(
    searchOption: Partial<Task>
  ): Promise<boolean> {
    const promise = new Promise<boolean>((res, rej) => {
      tasksDb.remove(
        searchOption,
        { multi: true },
        (error: Error | null, removed: number) => {
          if (error instanceof Error) {
            rej(error);
          }

          if (removed === 0) {
            res(false);
          }

          res(true);
        }
      );
    });

    return promise;
  }
}

export default TaskRepository;
