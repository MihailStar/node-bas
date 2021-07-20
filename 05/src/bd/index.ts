import NeDB from 'nedb';

import { Board } from '../resources/boards/board-model';
import { Column } from '../resources/columns/column-model';
import { Task } from '../resources/tasks/task-model';
import { User } from '../resources/users/user-model';

const db: {
  boards: NeDB<Board>;
  columns: NeDB<Column>;
  tasks: NeDB<Task>;
  users: NeDB<User>;
} = {
  boards: new NeDB(),
  columns: new NeDB(),
  tasks: new NeDB(),
  users: new NeDB(),
} as const;

export { db };
