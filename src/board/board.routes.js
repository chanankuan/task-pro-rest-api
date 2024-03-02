import express from 'express';
import boardController from './board.controller.js';
import { boardSchema } from './board.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.use(authenticate);
boardRouter.get('/', boardController.getAllBoards);
boardRouter.get('/:boardId', boardController.getOneBoard);
boardRouter.post('/', boardController.createOneBoard);
boardRouter.delete('/:boardId', boardController.deleteOneBoard);
boardRouter.patch('/:boardId', boardController.patchOneBoard);

export default boardRouter;
