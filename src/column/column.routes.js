import express from 'express';
import columnController from './column.controller.js';
import { columnSchema } from './column.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const columnRouter = express.Router();

columnRouter.use(authenticate);
columnRouter.get('/', columnController.getAllcolumns);
columnRouter.get('/:columnId', columnController.getOnecolumn);
columnRouter.post(
  '/',
  validateBody(columnSchema),
  columnController.createOnecolumn
);
columnRouter.delete('/:columnId', columnController.deleteOnecolumn);
columnRouter.patch(
  '/:columnId',
  validateBody(columnSchema),
  columnController.patchOnecolumn
);

export default columnRouter;
