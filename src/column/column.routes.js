import express from 'express';
import columnController from './column.controller.js';
import { columnSchema } from './column.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const columnRouter = express.Router();

columnRouter.use(authenticate);
columnRouter.get('/', columnController.getAllColumns);
columnRouter.get('/:columnId', columnController.getOneColumn);
columnRouter.post(
  '/',
  validateBody(columnSchema),
  columnController.createOneColumn
);
columnRouter.delete('/:columnId', columnController.deleteOneColumn);
columnRouter.patch(
  '/:columnId',
  validateBody(columnSchema),
  columnController.patchOneColumn
);

export default columnRouter;
