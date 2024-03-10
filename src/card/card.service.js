import { Board } from '../board/board.model.js';
import { Card } from './card.model.js';

const getAllCards = async userId => await Card.find({ owner: userId });

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
  await Card.findByIdAndUpdate(
    { _id: cardId, owner: userId },
    { column: columnId },
    { new: true }
  );

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
    const outdatedCount = await Card.countDocuments({
      owner: userId,
      deadline: { $lt: new Date() },
      board: boardId,
    });

    const todayCount = await Card.countDocuments({
      owner: userId,
      deadline: { $eq: new Date() },
      board: boardId,
    });

    const weekCount = await Card.countDocuments({
      owner: userId,
      deadline: {
        $lte: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      board: boardId,
    });

    const monthCount = await Card.countDocuments({
      owner: userId,
      deadline: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      board: boardId,
    });

    const furtherCount = await Card.countDocuments({
      owner: userId,
      deadline: { $eq: new Date() },
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
  getCardsStats,
};
