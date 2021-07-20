import UserRepository from './user.repository';
import User, { UserOptions } from './user.model';
import TaskService from '../tasks/task.service';

class UserService {
  public static async create(options: UserOptions): Promise<User> {
    const user = await UserRepository.create(options);

    return user;
  }

  public static async readAll(): Promise<User[]> {
    const users = await UserRepository.read();

    return users;
  }

  public static async read(userId: User['_id']): Promise<User | null> {
    const user = await UserRepository.read(userId);

    return user;
  }

  public static async update(
    userId: User['_id'],
    options: UserOptions
  ): Promise<User | null> {
    const user = await UserRepository.update(userId, options);

    if (user === null) {
      return null;
    }

    return user;
  }

  public static async remove(userId: User['_id']): Promise<User | null> {
    const user = await UserRepository.remove(userId);

    if (user === null) {
      return null;
    }

    await TaskService.updateMany({ userId }, { userId: null });

    return user;
  }
}

export default UserService;
