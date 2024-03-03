import { trycatch } from '../helpers/trycatch.js';
import boardService from './board.service.js';

const getAllBoards = async (req, res) => {
  const boards = await boardService.getAllBoards(req.user);

  res.json({ boards });
};

const getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  const { _id: userId } = req.user;

  const board = await boardService.getOneBoard(boardId, userId);
  res.json({ board });
};

const createOneBoard = async (req, res) => {
  const { _id: userId } = req.user;
  const newBoard = await boardService.createOneBoard({ ...req.body, userId });

  res.status(201).json({ board: newBoard });
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
