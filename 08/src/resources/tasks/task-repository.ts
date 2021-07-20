import { getRepository } from 'typeorm';

import { TaskDTO, Task } from './task-entity';

class TaskRepository {
  public static async create(options: TaskDTO): Promise<Task> {
    const createdTask = getRepository(Task).create(options);

    return getRepository(Task).save(createdTask);
  }

  public static async read(): Promise<Task[]>;
  public static async read(taskId: Task['id']): Promise<Task | undefined>;
  public static async read(
    taskId?: Task['id']
  ): Promise<Task[] | Task | undefined> {
    if (taskId === undefined) {
      return getRepository(Task).find();
    }

    return getRepository(Task).findOne(taskId);
  }

  public static async update(
    taskId: Task['id'],
    options: TaskDTO
  ): Promise<Task | undefined> {
    const task = await getRepository(Task).findOne(taskId);

    if (task === undefined) {
      return undefined;
    }

    const updatedTask = getRepository(Task).merge(task, options);

    return getRepository(Task).save(updatedTask);
  }

  public static async updateMany(
    searchOption: Partial<Task>,
    options: Partial<Task>
  ): Promise<Task[]> {
    const tasks = await getRepository(Task).find(searchOption);
    const updatedTasks = tasks.map((task) =>
      getRepository(Task).merge(task, options)
    );

    return getRepository(Task).save(updatedTasks);
  }

  public static async remove(taskId: Task['id']): Promise<Task | undefined> {
    const task = await getRepository(Task).findOne(taskId);

    if (task === undefined) {
      return undefined;
    }

    return getRepository(Task).remove(task);
  }

  public static async removeMany(searchOption: Partial<Task>): Promise<Task[]> {
    const tasks = await getRepository(Task).find(searchOption);

    return getRepository(Task).remove(tasks);
  }
}

export { TaskRepository };
