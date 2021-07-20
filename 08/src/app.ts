import express, { Express } from 'express';
import cors from 'cors';

import { incomingRequestLogger } from './handlers/incoming-request-logger';
import { authorizationChecker } from './handlers/authorization-checker';
import { loginRouter } from './resources/login/login-router';
import { boardRouter } from './resources/boards/board-router';
import { taskRouter } from './resources/tasks/task-router';
import { userRouter } from './resources/users/user-router';
import { errorHandler } from './handlers/error-handler';
import { endpointNotFoundHandler } from './handlers/endpoint-not-found-handler';

function createApp(): Express {
  const app = express();

  app
    .set('x-powered-by', false)
    .use(
      cors({
        allowedHeaders: ['Authorization', 'Content-Type'],
        methods: ['OPTIONS', 'POST', 'GET', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
      })
    )
    .use(express.json())
    .use(incomingRequestLogger)
    .use('/login/', loginRouter)
    .use('/boards/', authorizationChecker, boardRouter)
    .use('/boards/:boardId/tasks/', authorizationChecker, taskRouter)
    .use('/users/', authorizationChecker, userRouter)
    .use(errorHandler)
    .use(endpointNotFoundHandler);

  return app;
}

export { createApp };
