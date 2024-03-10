import cardService from './card.service.js';
import { trycatch } from '../helpers/trycatch.js';
import { HttpError } from '../helpers/HttpError.js';

const getAllCards = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const { boardId, columnId } = req.body;

  const cards = await cardService.getAllCards(_id, boardId, columnId);

  res.json({ cards });
};

const createOneCard = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const card = await cardService.createOneCard(req.body, _id);

  res.status(201).json({ card });
};

const deleteOneCard = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const { cardId } = req.params;

  const result = await cardService.deleteOneCard(cardId, _id);
  if (!result) throw HttpError(400, 'Card with this id is not found');

  res.json({ message: 'Card deleted successfully' });
};

const patchOneCard = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const { cardId } = req.params;

  const updatedCard = await cardService.patchOneCard(cardId, _id, req.body);

  if (!updatedCard) throw HttpError(400, 'Card with this id is not found');

  res.json({ card: updatedCard });
};

const changeCardStatus = async (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;
  const { columnId } = req.body;

  if (!userId) throw HttpError(401);

  const updatedCard = await cardService.changeCardStatus(
    cardId,
    userId,
    columnId
  );

  res.json({ card: updatedCard });
};

const changeCardOrder = async (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;
  const { columnId, order } = req.body;

  const updatedCard = await cardService.changeCardOrder(
    cardId,
    userId,
    columnId,
    order
  );

  res.json({ card: updatedCard });
};

export default {
  getAllCards: trycatch(getAllCards),
  createOneCard: trycatch(createOneCard),
  deleteOneCard: trycatch(deleteOneCard),
  patchOneCard: trycatch(patchOneCard),
  changeCardStatus: trycatch(changeCardStatus),
  changeCardOrder: trycatch(changeCardOrder),
};
