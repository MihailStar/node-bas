import { Optional, Model } from 'sequelize';

import { UserId } from './user.model';

type GameId = number;

type GameProps = {
  readonly id: GameId;
  title: string;
  owner_id: UserId;
  studio: string;
  esrb_rating: string;
  user_rating: string;
  have_played: string;
};

type GameCreationProps = Optional<GameProps, 'id'>;

type GameInstance = Model<GameProps, GameCreationProps> & GameProps;

export { GameId, GameProps, GameCreationProps, GameInstance };
