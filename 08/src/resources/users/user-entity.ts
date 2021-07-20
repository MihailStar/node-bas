import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ORMColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @ORMColumn()
  public name!: string;

  @Index('UQ_LOGIN', { unique: true })
  @ORMColumn()
  public login!: string;

  @ORMColumn()
  public password!: string;

  public static toResponse(user: User): Omit<User, 'password'> {
    return (({ password, ...rest }) => ({
      ...rest,
    }))(user);
  }

  @BeforeInsert()
  @BeforeUpdate()
  protected hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}

type UserDTO = Omit<User, 'id'>;

export { User, UserDTO };
