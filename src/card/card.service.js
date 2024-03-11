import { HttpError } from '../helpers/HttpError.js';
import { Board } from '../board/board.model.js';
import { Card } from './card.model.js';

const getAllCards = async userId => await Card.find({ owner: userId });

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

const getCardsStats = async userId => {
  const stats = {};

  //Counting separate boards

  const boards = await Board.find({ owner: userId });

  for (const board of boards) {
    const boardId = board._id;

    const allCardsCount = await Card.countDocuments({
      owner: userId,
      board: boardId,
    });

    // Get count for each priority
    const withoutPriorityCount = await Card.countDocuments({
      owner: userId,
      priority: 'without priority',
      board: boardId,
    });
    const lowPriorityCount = await Card.countDocuments({
      owner: userId,
      priority: 'low',
      board: boardId,
    });
    const mediumPriorityCount = await Card.countDocuments({
      owner: userId,
      priority: 'medium',
      board: boardId,
    });
    const highPriorityCount = await Card.countDocuments({
      owner: userId,
      priority: 'high',
      board: boardId,
    });

    // Get count for each deadline category
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const outdatedCount = await Card.countDocuments({
      owner: userId,
      deadline: { $lt: today },
      board: boardId,
    });

    const todayCount = await Card.countDocuments({
      owner: userId,
      deadline: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
      board: boardId,
    });

    const todayDate = today.getDate();
    const todayDay = today.getDay();

    // get first date of week
    const weekStart = new Date(today.setDate(todayDate - todayDay));

    // get last date of week
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekCount = await Card.countDocuments({
      owner: userId,
      deadline: {
        $gte: weekStart,
        $lte: weekEnd,
      },
      board: boardId,
    });

    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthCount = await Card.countDocuments({
      owner: userId,
      deadline: {
        $lt: new Date(monthEnd.setHours(23, 59, 59, 999)),
      },
      board: boardId,
    });

    const nextMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const furtherCount = await Card.countDocuments({
      owner: userId,
      deadline: { $gte: nextMonthStart },
      board: boardId,
    });

    // Organize the stats for the current board
    stats[board.title] = {
      number: allCardsCount,
      without: withoutPriorityCount,
      low: lowPriorityCount,
      medium: mediumPriorityCount,
      high: highPriorityCount,
      outdated: outdatedCount,
      today: todayCount,
      week: weekCount,
      month: monthCount,
      further: furtherCount,
    };
  }

  // Initialize the "all" object
  const allStats = {
    number: 0,
    without: 0,
    low: 0,
    medium: 0,
    high: 0,
    outdated: 0,
    today: 0,
    week: 0,
    month: 0,
    further: 0,
  };

  // Calculate the sum for each property across all boards
  for (const boardStats of Object.values(stats)) {
    for (const key of Object.keys(allStats)) {
      allStats[key] += boardStats[key];
    }
  }

  // Add the "all" object to tempStats
  stats.all = allStats;

  return stats;
};

export default {
  getAllCards,
  createOneCard,
  deleteOneCard,
  patchOneCard,
  changeCardStatus,
  changeCardOrder,
  getCardsStats,
};
