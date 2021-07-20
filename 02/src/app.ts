import express, { Express } from 'express';

import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import userRouter from './resources/users/user.router';

function createApp(): Express {
  const app = express();

  app
    .set('x-powered-by', false)
    .use(express.json())
    .use('/boards/', boardRouter)
    .use('/boards/:boardId/tasks/', taskRouter)
    .use('/users/', userRouter);

  return app;
}

export default createApp;
