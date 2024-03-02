import express from 'express';
import cardController from './card.controller.js';
import { cardSchema } from './card.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const cardRouter = express.Router();

cardRouter.use(authenticate);
cardRouter.get('/', cardController.getAllCards);
cardRouter.get('/:cardId', cardController.getOneCard);
cardRouter.post('/', validateBody(cardSchema), cardController.createOneCard);
cardRouter.delete('/:cardId', cardController.deleteOneCard);
cardRouter.patch(
  '/:cardId',
  validateBody(cardSchema),
  cardController.patchOneCard
);

export default cardRouter;
