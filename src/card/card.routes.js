import express from 'express';
import cardController from './card.controller.js';
import { createCardSchema, patchCardSchema } from './card.schema.js';
import {
  authenticate,
  validateBody,
  validateId,
} from '../middlewares/index.js';

export const cardRouter = express.Router();

cardRouter.use(authenticate);
cardRouter.get('/', cardController.getAllCards);
cardRouter.get('/stats', cardController.getCardsStats);
cardRouter.post(
  '/',
  validateBody(createCardSchema),
  cardController.createOneCard
);
cardRouter.delete(
  '/:cardId',
  validateId('cardId'),
  cardController.deleteOneCard
);
cardRouter.patch(
  '/:cardId',
  validateId('cardId'),
  validateBody(patchCardSchema),
  cardController.patchOneCard
);
cardRouter.patch(
  '/:cardId/status',
  validateId('cardId'),
  cardController.changeCardStatus
);

cardRouter.patch('/:cardId/order', cardController.changeCardOrder);

export default cardRouter;
