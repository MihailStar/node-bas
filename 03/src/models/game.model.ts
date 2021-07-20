import { DataTypes } from 'sequelize';

import db from '../db';
import ExitCode from '../constants/exit-code';
import {
  GameId,
  GameProps,
  GameCreationProps,
  GameInstance,
} from './game.model.d';

const GameModel = db.define<GameInstance>('game', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },

  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  studio: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  esrb_rating: {
    type: DataTypes.CHAR(5),
    allowNull: false,
  },

  user_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },

  have_played: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

(async (): Promise<void> => {
  try {
    await GameModel.sync();
    process.stdout.write('+ Game model sync successful\n');
  } catch (error) {
    process.stderr.write('- Game model sync failed\n');
    process.stderr.write(error);
    process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
  }
})();

export { GameId, GameProps, GameCreationProps, GameInstance };
export default GameModel;
