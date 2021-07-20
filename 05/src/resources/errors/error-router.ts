import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const errorRouter = Router();

// Далее от использования express-async-handler пришлось отказаться,
// так как текущая версия (1.1.4) имеет кривое описание типов
// TODO: выпилить asyncHandler или поправить описание типов

errorRouter
  .all('/sync-exception/', () => {
    throw new Error('Sync exception');
  })
  .all(
    '/async-exception/',
    asyncHandler(async () => {
      throw new Error('Async exception');
    })
  )
  .all('/uncaught-exception/', () => {
    setImmediate(() => {
      throw new Error('Uncaught exception');
    });
  })
  .all('/unhandled-rejection/', () => {
    Promise.reject(new Error('Unhandled rejection'));
  });

export { errorRouter };
