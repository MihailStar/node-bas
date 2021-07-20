import { Router } from 'express';

import { asyncFuncWrapper } from '../../helpers/async-func-wrapper';
import { TaskConroller } from './task-controller';

const taskRouter = Router({ mergeParams: true });

taskRouter
  .route('/')
  .post(asyncFuncWrapper(TaskConroller.create))
  .get(asyncFuncWrapper(TaskConroller.readAll));

taskRouter
  .route('/:taskId/')
  .get(asyncFuncWrapper(TaskConroller.read))
  .put(asyncFuncWrapper(TaskConroller.update))
  .delete(asyncFuncWrapper(TaskConroller.remove));

export { taskRouter };
