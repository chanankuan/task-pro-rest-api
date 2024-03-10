import { HttpError } from '../helpers/HttpError.js';
import { Card } from './card.model.js';

const getAllCards = async (userId, boardId, columnId) =>
  await Card.find({ owner: userId, board: boardId, column: columnId });

const createOneCard = async (cardInfo, userId) => {
  const maxOrder = await Card.findOne({
    owner: userId,
    column: cardInfo.column,
  })
    .sort({ order: -1 })
    .limit(1)
    .select('order');

  const newOrder = maxOrder ? maxOrder.order + 1 : 1;

  return await Card.create({
    ...cardInfo,
    owner: userId,
    order: newOrder,
  });
};

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
  await Card.findByIdAndUpdate(
    { _id: cardId, owner: userId },
    { column: columnId },
    { new: true }
  );

const changeCardOrder = async (cardId, userId, columnId, newOrder) => {
  const targetCard = await Card.findOne({
    _id: cardId,
    owner: userId,
    column: columnId,
  });

  if (!targetCard) {
    throw HttpError(404, 'Card not found');
  }

  const cardsToUpdate = await Card.find({
    owner: userId,
    column: columnId,
    order: { $gte: newOrder },
  });

  const updatePromises = cardsToUpdate.map(async card => {
    card.order = targetCard.order > card.order ? card.order + 1 : card.order;
    await card.save();
  });

  targetCard.order = newOrder;

  await targetCard.save();
  await Promise.all(updatePromises);

  return targetCard;
};

export default {
  getAllCards,
  createOneCard,
  deleteOneCard,
  patchOneCard,
  changeCardStatus,
  changeCardOrder,
};
