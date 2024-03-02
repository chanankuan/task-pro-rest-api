import express from 'express';
import boardController from './board.controller.js';
import { patchBoardSchema, createBoardSchema } from './board.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.use(authenticate);
boardRouter.get('/', boardController.getAllBoards);
boardRouter.get('/:boardId', boardController.getOneBoard);
boardRouter.post(
  '/',
  validateBody(createBoardSchema),
  boardController.createOneBoard
);
boardRouter.delete('/:boardId', boardController.deleteOneBoard);
boardRouter.patch(
  '/:boardId',
  validateBody(patchBoardSchema),
  boardController.patchOneBoard
);

export default boardRouter;
