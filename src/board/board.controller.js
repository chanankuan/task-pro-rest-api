import { trycatch } from '../helpers/trycatch.js';
import boardService from './board.service.js';
import { ImageBackgroundService } from '../image/image-background.service.js';
import { CLOUDINARY_FOLDER } from '../constants/CloudinaryFolderConstants.js';

const getAllBoards = async (req, res) => {
  const boards = await boardService.getAllBoards(req.user);

  res.json({ boards });
};

const getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  const { _id: userId } = req.user;
  const { priority } = req.query;

  const filters = {};
  if (priority) {
    filters.priority = priority;
  }

  const board = await boardService.getOneBoard(boardId, userId, filters);
  res.json({ board });
};

const createOneBoard = async (req, res) => {
  // const { _id: userId } = req.user;
  // const newBoard = await boardService.createOneBoard({ ...req.body, userId });

  // res.status(201).json({ board: newBoard });

  // const backgroundURL = await ImageService.saveImageToCloud(
  //   CLOUDINARY_FOLDER.CUSTOM_BACKGROUNDS
  // );

  const options = {
    backgroundDesktopURL: { width: 1180, height: 770 },
    backgroundDesktop2xURL: { width: 1180, height: 770 },
    backgroundTabletURL: { width: 768, height: 956 },
    backgroundTablet2xURL: { width: 768, height: 956 },
    backgroundMobileURL: { width: 375, height: 812 },
    backgroundMobile2xURL: { width: 375, height: 812 },
    backgroundMinURL: { width: 28, height: 28 },
    backgroundMin2xURL: { width: 28, height: 28 },
  };

  await ImageBackgroundService.processBackgroundImages(options);
  const backgrounds = await ImageBackgroundService.saveBackgroundToCloud(
    CLOUDINARY_FOLDER.CUSTOM_BACKGROUNDS
  );

  res.json(backgrounds);
};

const deleteOneBoard = async (req, res) => {
  const board = await boardService.deleteOneBoard(req.params.boardId);

  res.json({ board });
};

const patchOneBoard = async (req, res) => {
  const board = await boardService.patchOneBoard(req.params.boardId, req.body);

  res.json({ board });
};

export default {
  getAllBoards: trycatch(getAllBoards),
  getOneBoard: trycatch(getOneBoard),
  createOneBoard: trycatch(createOneBoard),
  deleteOneBoard: trycatch(deleteOneBoard),
  patchOneBoard: trycatch(patchOneBoard),
};
