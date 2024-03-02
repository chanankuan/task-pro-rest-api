import express from 'express';
import cardController from './card.controller.js';
import {
  createCardSchema,
  patchCardSchema,
  deleteCardSchema,
} from './card.schema.js';
import { authenticate, validateBody, isValidId } from '../middlewares/index.js';

const cardRouter = express.Router();

cardRouter.use(authenticate);
cardRouter.get('/', cardController.getAllCards);
cardRouter.post(
  '/',
  validateBody(createCardSchema),
  cardController.createOneCard
);
cardRouter.delete(
  '/:cardId',
  isValidId('cardId'),
  validateBody(deleteCardSchema),
  cardController.deleteOneCard
);
cardRouter.patch(
  '/:cardId',
  isValidId('cardId'),
  validateBody(patchCardSchema),
  cardController.patchOneCard
);

export default cardRouter;
