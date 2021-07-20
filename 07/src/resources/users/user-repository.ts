import { getRepository } from 'typeorm';

import { UserDTO, User } from './user-entity';

class UserRepository {
  public static async create(options: UserDTO): Promise<User> {
    const createdUser = getRepository(User).create(options);

    return getRepository(User).save(createdUser);
  }

  public static async read(): Promise<User[]>;
  public static async read(userId: User['id']): Promise<User | undefined>;
  public static async read(
    userId?: User['id']
  ): Promise<User[] | User | undefined> {
    if (userId === undefined) {
      return getRepository(User).find();
    }

    return getRepository(User).findOne(userId);
  }

  public static async update(
    userId: User['id'],
    options: UserDTO
  ): Promise<User | undefined> {
    const user = await getRepository(User).findOne(userId);

    if (user === undefined) {
      return undefined;
    }

    const updatedUser = getRepository(User).merge(user, options);

    return getRepository(User).save(updatedUser);
  }

  public static async remove(userId: User['id']): Promise<User | undefined> {
    const user = await getRepository(User).findOne(userId);

    if (user === undefined) {
      return undefined;
    }

    return getRepository(User).remove(user);
  }
}

export { UserRepository };
