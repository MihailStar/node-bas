import { UserDTO, User } from './user-entity';
import { UserRepository } from './user-repository';
import { TaskService } from '../tasks/task-service';

class UserService {
  /** @throws {QueryFailedError} 'UQ_LOGIN' */
  public static async create(options: UserDTO): Promise<User> {
    return UserRepository.create(options);
  }

  public static async readAll(): Promise<User[]> {
    return UserRepository.read();
  }

  public static async read(userId: User['id']): Promise<User | undefined> {
    return UserRepository.read(userId);
  }

  public static async readByLogin(
    userLogin: User['login']
  ): Promise<User | undefined> {
    return UserRepository.readByLogin(userLogin);
  }

  public static async update(
    userId: User['id'],
    options: UserDTO
  ): Promise<User | undefined> {
    return UserRepository.update(userId, options);
  }

  public static async remove(userId: User['id']): Promise<User | undefined> {
    await TaskService.updateMany({ userId }, { userId: null });

    return UserRepository.remove(userId);
  }
}

export { UserService };
