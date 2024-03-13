import mongoose, { Types } from 'mongoose';
import { Board } from './board.model.js';
import { Column } from '../column/column.model.js';
import { Card } from '../card/card.model.js';
import { Background } from '../background/background.model.js';
import { HttpError } from '../helpers/HttpError.js';
import { ImageBackgroundService } from '../image/image-background.service.js';
import { CLOUDINARY_FOLDER } from '../constants/CloudinaryFolderConstants.js';
import { BACKGROUND_OPTIONS } from '../constants/backgroundOptions.js';

const { ObjectId } = mongoose.Types;

const getAllBoards = async ({ _id }) => {
  const filter = { owner: _id };

  return await Board.find(filter);
};

const getOneBoard = async (boardId, userId, filters) => {
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
          {
            $project: {
              _id: 1,
              title: 1,
              board: 1,
              cards: {
                $filter: {
                  input: '$cards',
                  as: 'card',
                  cond: {
                    $cond: {
                      if: { $eq: [filters.priority, null] },
                      then: true,
                      else: { $eq: ['$$card.priority', filters.priority] },
                    },
                  },
                },
              },
            },
          },
          {
            $unwind: {
              path: '$cards',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $sort: { 'cards.order': 1 },
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              board: { $first: '$board' },
              cards: { $push: '$cards' },
            },
          },
          {
            $sort: { _id: 1 },
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
            order: 1,
          },
        },
      },
    },
  ]);

  await Background.populate(result, {
    path: 'background',
    select: '-createdAt -updatedAt',
  });

  return result;
};

const createOneBoard = async (
  { title, iconId, backgroundId, userId },
  file
) => {
  const defaultBackground = await checkDefaultBackgroundExists();

  if (!file) {
    return Board.create({
      title,
      icon_id: iconId,
      background: backgroundId ?? defaultBackground._id,
      owner: userId,
    });
  }

  await ImageBackgroundService.processBackgroundImages(BACKGROUND_OPTIONS);
  const backgrounds = await ImageBackgroundService.saveBackgroundToCloud(
    CLOUDINARY_FOLDER.CUSTOM_BACKGROUNDS
  );

  const background = await Background.create(backgrounds);

  return Board.create({
    title,
    icon_id: iconId,
    background: background._id ?? backgroundId ?? defaultBackground._id,
    owner: userId,
  });
};

const deleteOneBoard = async boardId => {
  await Board.findByIdAndDelete(boardId);
  await Column.deleteMany({ board: boardId });
  await Card.deleteMany({ board: boardId });
};

const patchOneBoard = async (boardId, boardData, boardFile) => {
  if (!Object.keys(boardData).length) {
    throw HttpError(400, 'Required at least one field');
  }

  const background = await checkIsValidBackgroundId(boardData.backgroundId);
  const board = await Board.findById(boardId);

  board.title = boardData.title ?? board.title;
  board.icon_id = boardData.iconId ?? board.icon_id;

  if (!boardFile) {
    board.background = boardData.backgroundId ? background : board.background;
    return (await board.save()).populate({
      path: 'background',
      select: '-createdAt -updatedAt',
    });
  }

  await ImageBackgroundService.processBackgroundImages(BACKGROUND_OPTIONS);
  const backgrounds = await ImageBackgroundService.saveBackgroundToCloud(
    CLOUDINARY_FOLDER.CUSTOM_BACKGROUNDS
  );

  const customBackground = await Background.create(backgrounds);

  board.background = customBackground;

  return board.save();
};

const checkIsValidBackgroundId = async backgroundId => {
  const isValidBackgroundId = Types.ObjectId.isValid(backgroundId);

  if (backgroundId && !isValidBackgroundId) {
    throw HttpError(400, 'Invalid background id');
  }

  const background = await Background.findById(backgroundId);

  if (backgroundId && !background) {
    throw HttpError(400, 'Invalid background id');
  }

  return background;
};

const checkDefaultBackgroundExists = async () => {
  const defaultBackground = await Background.findOne({
    backgroundDesktopURL: '',
  });

  if (!defaultBackground) {
    throw HttpError(404, 'Not found background id');
  }

  return defaultBackground;
};

export default {
  getAllBoards,
  getOneBoard,
  createOneBoard,
  deleteOneBoard,
  patchOneBoard,
};
