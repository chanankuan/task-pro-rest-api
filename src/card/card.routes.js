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
cardRouter.post(
  '/',
  validateBody(createCardSchema),
  cardController.createOneCard
);
cardRouter.patch(
  '/:cardId',
  validateId('cardId'),
  validateBody(patchCardSchema),
  cardController.patchOneCard
);

export default cardRouter;
