import { Card } from './card.model.js';

const getAllCards = async (userId, boardId, columnId) =>
  await Card.find({ owner: userId, board: boardId, column: columnId });

const createOneCard = async (cardInfo, userId) =>
  await Card.create({
    ...cardInfo,
    owner: userId,
  });

const deleteOneCard = async (cardId, userId) =>
  await Card.findByIdAndDelete({
    _id: cardId,
    owner: userId,
  });

const patchOneCard = async (cardId, userId, cardInfo) =>
  await Card.findByIdAndUpdate({ _id: cardId, owner: userId }, cardInfo, {
    new: true,
  });

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
