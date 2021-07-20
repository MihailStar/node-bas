import { Optional, Model } from 'sequelize';

type UserId = number;

type UserProps = {
  readonly id: UserId;
  full_name: string;
  username: string;
  password: string;
  email: string;
};

type UserCreationProps = Optional<UserProps, 'id'>;

type UserInstance = Model<UserProps, UserCreationProps> & UserProps;

export { UserId, UserProps, UserCreationProps, UserInstance };
