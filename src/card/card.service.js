import { Card } from './card.model.js';

const getAllCards = async (userId, boardId, columnId) =>
  await Card.find({ owner: userId, board_id: boardId, column_id: columnId });

const createOneCard = async (cardInfo, userId, boardId, columnId) =>
  await Card.create({
    ...cardInfo,
    owner: userId,
    board_id: boardId,
    column_id: columnId,
  });

const deleteOneCard = async (cardId, userId, boardId, columnId) =>
  await Card.findByIdAndDelete({
    _id: cardId,
    owner: userId,
    board_id: boardId,
    column_id: columnId,
  });

const patchOneCard = async (cardId, userId, boardId, columnId, cardInfo) =>
  await Card.findByIdAndUpdate(
    { _id: cardId, owner: userId, board_id: boardId, column_id: columnId },
    cardInfo,
    { new: true }
  );

export default {
  getAllCards,
  createOneCard,
  deleteOneCard,
  patchOneCard,
};
