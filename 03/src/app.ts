import express from 'express';

import authRouter from './routers/auth.router';
import gameRouter from './routers/game.router';
import errorHandler from './middlewares/error.handler';
import notFoundHandler from './middlewares/not-found.handler';
import config from './common/config';

const app = express();

app
  .set('x-powered-by', false)
  .use(express.json())
  .use('/api/auth/', authRouter)
  .use('/api/game/', gameRouter)
  .use(errorHandler)
  .use(notFoundHandler)
  .listen(Number.parseInt(config.PORT, 10), () => {
    process.stdout.write('+ Application started successful\n');
    process.stdout.write(`+ http://localhost:${config.PORT}\n`);
  });
