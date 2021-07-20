import { Router } from 'express';

import validateSessionMiddleware from '../middlewares/validate-session.middleware';
import gameController from '../controllers/game.controller';

const gameRouter = Router();

gameRouter
  .use(validateSessionMiddleware)
  .post('/create/', gameController.create)
  .get('/all/', gameController.readAll)
  .get('/:gameId/', gameController.read)
  .put('/update/:gameId/', gameController.update)
  .delete('/remove/:gameId/', gameController.remove);

export default gameRouter;
