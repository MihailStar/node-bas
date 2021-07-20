import { DataTypes } from 'sequelize';

import db from '../db';
import ExitCode from '../constants/exit-code';
import {
  UserId,
  UserProps,
  UserCreationProps,
  UserInstance,
} from './user.model.d';

const UserModel = db.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

(async (): Promise<void> => {
  try {
    await UserModel.sync();
    process.stdout.write('+ User model sync successful\n');
  } catch (error) {
    process.stderr.write('- User model sync failed\n');
    process.stderr.write(error);
    process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
  }
})();

export { UserId, UserProps, UserCreationProps, UserInstance };
export default UserModel;
