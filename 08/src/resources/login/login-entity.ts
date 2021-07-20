import { User } from '../users/user-entity';

type LoginDTO = { login: User['login']; password: User['password'] };

export { LoginDTO };
