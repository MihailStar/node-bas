import { Router } from 'express';

import { asyncControllerErrorCatcher } from '../../helpers/async-controller-error-catcher';
import { TaskConroller } from './task-controller';

const taskRouter = Router({ mergeParams: true });

taskRouter
  .route('/')
  .post(asyncControllerErrorCatcher(TaskConroller.create))
  .get(asyncControllerErrorCatcher(TaskConroller.readAll));

taskRouter
  .route('/:taskId/')
  .get(asyncControllerErrorCatcher(TaskConroller.read))
  .put(asyncControllerErrorCatcher(TaskConroller.update))
  .delete(asyncControllerErrorCatcher(TaskConroller.remove));

export { taskRouter };
