import { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  createRequest,
  createResponse,
  readAllRequest,
  readAllResponse,
  readRequest,
  readResponse,
  updateRequest,
  updateResponse,
  removeRequest,
  removeResponse,
} from './game.controller.d';
import GameModel from '../models/game.model';

const gameController = {
  async create(
    req: createRequest,
    res: createResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const game = await GameModel.create({
        title: req.body.game.title,
        owner_id: res.locals.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      });

      res.status(StatusCodes.CREATED).json({
        game,
      });
    } catch (error) {
      next(error);
    }
  },

  async readAll(
    req: readAllRequest,
    res: readAllResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const games = await GameModel.findAll({
        where: { owner_id: res.locals.user.id },
      });

      if (games.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Games not found' });
      }

      res.status(StatusCodes.OK).json({
        games,
      });
    } catch (error) {
      next(error);
    }
  },

  async read(
    req: readRequest,
    res: readResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const game = await GameModel.findOne({
        where: { id: req.params.gameId, owner_id: res.locals.user.id },
      });

      if (game === null) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Game not found' });
        return;
      }

      res.status(200).json({
        game,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(
    req: updateRequest,
    res: updateResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const [, games] = await GameModel.update(
        {
          title: req.body.game.title,
          studio: req.body.game.studio,
          esrb_rating: req.body.game.esrb_rating,
          user_rating: req.body.game.user_rating,
          have_played: req.body.game.have_played,
        },
        {
          where: {
            id: req.params.gameId,
            owner_id: res.locals.user.id,
          },
          returning: true,
        }
      );

      if (games.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Game not found' });
        return;
      }

      res.status(StatusCodes.OK).json({
        game: games[0],
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(
    req: removeRequest,
    res: removeResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const game = await GameModel.findOne({
        where: { id: req.params.gameId, owner_id: res.locals.user.id },
      });

      if (game === null) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Game not found' });
        return;
      }

      await GameModel.destroy({
        where: {
          id: req.params.gameId,
          owner_id: res.locals.user.id,
        },
      });

      res.status(200).json({
        game,
      });
    } catch (error) {
      next(error);
    }
  },
} as const;

export {
  createRequest,
  createResponse,
  readAllRequest,
  readAllResponse,
  readRequest,
  readResponse,
  updateRequest,
  updateResponse,
  removeRequest,
  removeResponse,
};
export default gameController;
