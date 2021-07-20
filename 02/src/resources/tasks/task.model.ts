import { v4 as uuid } from 'uuid';

import User from '../users/user.model';
import Board from '../boards/board.model';
import Column from '../columns/column.model';

type TaskOptions = {
  title: string;
  order: number;
  description: string;
  userId: User['_id'] | null;
  boardId: Board['_id'] | null;
  columnId: Column['_id'] | null;
};

class Task {
  public readonly _id = uuid();
  public title: TaskOptions['title'];
  public order: TaskOptions['order'];
  public description: TaskOptions['description'];
  public userId: TaskOptions['userId'] | null;
  public boardId: TaskOptions['boardId'] | null;
  public columnId: TaskOptions['columnId'] | null;

  public constructor(options: TaskOptions) {
    this.title = options.title;
    this.order = options.order;
    this.description = options.description;
    this.userId = options.userId;
    this.boardId = options.boardId;
    this.columnId = options.columnId;
  }

  public static toResponse(
    task: Task
  ): Omit<Task, '_id'> & { readonly id: Task['_id'] } {
    return (({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }))(task);
  }
}

export { TaskOptions };
export default Task;
