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

  const { title, description, priority, deadline, boardId, columnId } =
    req.body;

  const card = await cardService.createOneCard(
    { title, description, priority, deadline },
    _id,
    boardId,
    columnId
  );

  res.status(201).json({ card });
};

const deleteOneCard = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const { cardId } = req.params;
  const { boardId, columnId } = req.body;

  const result = await cardService.deleteOneCard(
    cardId,
    _id,
    boardId,
    columnId
  );
  if (!result) throw HttpError(400, 'Card with this id is not found');

  res.json({ message: 'Card deleted successfully' });
};

const patchOneCard = async (req, res) => {
  const { _id } = req.user;
  if (!_id) throw HttpError(401);

  const { cardId } = req.params;
  const { boardId, columnId } = req.body;
  const updatedCard = await cardService.patchOneCard(
    cardId,
    _id,
    boardId,
    columnId,
    req.body
  );

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

export default {
  getAllCards: trycatch(getAllCards),
  createOneCard: trycatch(createOneCard),
  deleteOneCard: trycatch(deleteOneCard),
  patchOneCard: trycatch(patchOneCard),
  changeCardStatus: trycatch(changeCardStatus),
};
