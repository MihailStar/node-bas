import { v4 as uuid } from 'uuid';

type UserOptions = {
  name: string;
  login: string;
  password: string;
};

class User {
  public readonly _id = uuid();
  public name: UserOptions['name'];
  public login: UserOptions['login'];
  public password: UserOptions['password'];

  public constructor(options: UserOptions) {
    this.name = options.name;
    this.login = options.login;
    this.password = options.password;
  }

  public static toResponse(
    user: User
  ): Omit<User, '_id' | 'password'> & { readonly id: User['_id'] } {
    return (({ _id, password, ...rest }) => ({
      id: _id,
      ...rest,
    }))(user);
  }
}

export { UserOptions };
export default User;
