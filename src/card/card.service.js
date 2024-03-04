import { Card } from './card.model.js';

const getAllCards = async (userId, boardId, columnId) =>
  await Card.find({ owner: userId, board: boardId, column: columnId });

const createOneCard = async (cardInfo, userId, boardId, columnId) =>
  await Card.create({
    ...cardInfo,
    owner: userId,
    board: boardId,
    column: columnId,
  });

const deleteOneCard = async (cardId, userId, boardId, columnId) =>
  await Card.findByIdAndDelete({
    _id: cardId,
    owner: userId,
    board: boardId,
    column: columnId,
  });

const patchOneCard = async (cardId, userId, boardId, columnId, cardInfo) =>
  await Card.findByIdAndUpdate(
    { _id: cardId, owner: userId, board: boardId, column: columnId },
    cardInfo,
    { new: true }
  );

const changeCardStatus = async (cardId, userId, columnId) =>
  Card.findByIdAndUpdate(
    { _id: cardId, owner: userId },
    { column: columnId },
    { new: true }
  );

export default {
  getAllCards,
  createOneCard,
  deleteOneCard,
  patchOneCard,
  changeCardStatus,
};
