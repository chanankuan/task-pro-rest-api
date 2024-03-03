import mongoose from 'mongoose';
import { Board } from './board.model.js';
import { Background } from '../background/background.model.js';

const { ObjectId } = mongoose.Types;

const getAllBoards = async () => {
  // get all boards
};

const getOneBoard = async (boardId, userId) => {
  const result = await Board.aggregate([
    {
      $match: {
        _id: new ObjectId(String(boardId)),
        owner: new ObjectId(String(userId)),
      },
    },
    {
      $lookup: {
        from: 'columns',
        localField: '_id',
        foreignField: 'board',
        pipeline: [
          {
            $lookup: {
              from: 'cards',
              localField: '_id',
              foreignField: 'column',
              as: 'cards',
            },
          },
        ],
        as: 'columns',
      },
    },
    {
      $project: {
        title: 1,
        icon_id: 1,
        background: 1,
        owner: 1,
        columns: {
          _id: 1,
          title: 1,
          board: 1,
          cards: {
            _id: 1,
            title: 1,
            description: 1,
            priority: 1,
            deadline: 1,
            board: 1,
            column: 1,
            owner: 1,
          },
        },
      },
    },
  ]);

  await Background.populate(result, { path: 'background' });

  return result;
};

const createOneBoard = async ({ title, iconId, backgroundId, userId }) => {
  const defaultBackgrundId = await Background.findOne({
    backgroundDesktopURL: '',
  });

  return Board.create({
    title,
    icon_id: iconId,
    background: backgroundId ?? defaultBackgrundId._id,
    owner: userId,
  });
};

const deleteOneBoard = async () => {
  // delete one board
};

const patchOneBoard = async () => {
  // edit one board
};

export default {
  getAllBoards,
  getOneBoard,
  createOneBoard,
  deleteOneBoard,
  patchOneBoard,
};
