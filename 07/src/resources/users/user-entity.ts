import { Entity, PrimaryGeneratedColumn, Column as ORMColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @ORMColumn()
  public name!: string;

  @ORMColumn()
  public login!: string;

  @ORMColumn()
  public password!: string;

  public static toResponse(user: User): Omit<User, 'password'> {
    return (({ password, ...rest }) => ({
      ...rest,
    }))(user);
  }
}

type UserDTO = Omit<User, 'id'>;

export { User, UserDTO };
