import express from 'express';
import boardController from './board.controller.js';
import { patchBoardSchema, createBoardSchema } from './board.schema.js';
import { Board } from './board.model.js';
import * as middleware from '../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.use(middleware.authenticate);
boardRouter.get('/', boardController.getAllBoards);
boardRouter.get(
  '/:boardId',
  middleware.validateId('boardId'),
  middleware.checkIsItemExists(Board, 'boardId'),
  boardController.getOneBoard
);
boardRouter.post(
  '/',
  middleware.validateBody(createBoardSchema),
  boardController.createOneBoard
);
boardRouter.delete(
  '/:boardId',
  middleware.validateId('boardId'),
  middleware.checkIsItemExists(Board, 'boardId'),
  boardController.deleteOneBoard
);
boardRouter.patch(
  '/:boardId',
  middleware.validateId('boardId'),
  middleware.checkIsItemExists(Board, 'boardId'),
  middleware.validateBody(patchBoardSchema),
  boardController.patchOneBoard
);

export default boardRouter;
