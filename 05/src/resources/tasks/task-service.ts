import { TaskOptions, Task } from './task-model';
import { TaskRepository } from './task-repository';

class TaskService {
  public static async create(options: TaskOptions): Promise<Task> {
    const task = await TaskRepository.create(options);

    return task;
  }

  public static async readAll(): Promise<Task[]> {
    const tasks = await TaskRepository.read();

    return tasks;
  }

  public static async read(taskId: Task['_id']): Promise<Task | null> {
    const task = await TaskRepository.read(taskId);

    return task;
  }

  public static async update(
    taskId: Task['_id'],
    options: TaskOptions
  ): Promise<Task | null> {
    const task = await TaskRepository.update(taskId, options);

    if (task === null) {
      return null;
    }

    return task;
  }

  public static async updateMany(
    option: Partial<TaskOptions>,
    updateOption: Partial<TaskOptions>
  ): Promise<boolean> {
    const isSuccess = await TaskRepository.updateMany(option, updateOption);

    return isSuccess;
  }

  public static async remove(taskId: Task['_id']): Promise<Task | null> {
    const task = await TaskRepository.remove(taskId);

    if (task === null) {
      return null;
    }

    return task;
  }

  public static async removeMany(
    option: Partial<TaskOptions>
  ): Promise<boolean> {
    const isSuccess = await TaskRepository.removeMany(option);

    return isSuccess;
  }
}

export { TaskService };
