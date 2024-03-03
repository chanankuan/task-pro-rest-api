import express from 'express';
import boardController from './board.controller.js';
import { patchBoardSchema, createBoardSchema } from './board.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';
import boardMiddleware from './board.middleware.js';

const boardRouter = express.Router();

boardRouter.use(authenticate);
boardRouter.get('/', boardController.getAllBoards);
boardRouter.get(
  '/:boardId',
  boardMiddleware.checkBoardId,
  boardController.getOneBoard
);
boardRouter.post(
  '/',
  validateBody(createBoardSchema),
  boardController.createOneBoard
);
boardRouter.delete(
  '/:boardId',
  boardMiddleware.checkBoardId,
  boardController.deleteOneBoard
);
boardRouter.patch(
  '/:boardId',
  boardMiddleware.checkBoardId,
  validateBody(patchBoardSchema),
  boardController.patchOneBoard
);

export default boardRouter;
