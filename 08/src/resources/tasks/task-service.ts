import { TaskDTO, Task } from './task-entity';
import { TaskRepository } from './task-repository';

class TaskService {
  public static async create(options: TaskDTO): Promise<Task> {
    return TaskRepository.create(options);
  }

  public static async readAll(): Promise<Task[]> {
    return TaskRepository.read();
  }

  public static async read(taskId: Task['id']): Promise<Task | undefined> {
    return TaskRepository.read(taskId);
  }

  public static async update(
    taskId: Task['id'],
    options: TaskDTO
  ): Promise<Task | undefined> {
    return TaskRepository.update(taskId, options);
  }

  public static async updateMany(
    option: Partial<TaskDTO>,
    updateOption: Partial<TaskDTO>
  ): Promise<Task[]> {
    return TaskRepository.updateMany(option, updateOption);
  }

  public static async remove(taskId: Task['id']): Promise<Task | undefined> {
    return TaskRepository.remove(taskId);
  }

  public static async removeMany(option: Partial<TaskDTO>): Promise<Task[]> {
    return TaskRepository.removeMany(option);
  }
}

export { TaskService };
