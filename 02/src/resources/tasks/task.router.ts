import { Router } from 'express';

import TaskConroller from './task.controller';

const taskRouter = Router({ mergeParams: true });

taskRouter
  .route('/')
  .post(TaskConroller.create)
  .get(TaskConroller.readAll);

taskRouter
  .route('/:taskId/')
  .get(TaskConroller.read)
  .put(TaskConroller.update)
  .delete(TaskConroller.remove);

export default taskRouter;
