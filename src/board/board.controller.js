import { trycatch } from '../helpers/trycatch.js';

const getAllBoards = async (req, res) => {
  // get all boards
};

const getOneBoard = async (req, res) => {
  // get one boards
};

const createOneBoard = async (req, res) => {
  // get one board
};

const deleteOneBoard = async (req, res) => {
  // delete one board
};

const patchOneBoard = async (req, res) => {
  // edit one board
};

export default {
  getAllBoards: trycatch(getAllBoards),
  getOneBoard: trycatch(getOneBoard),
  createOneBoard: trycatch(createOneBoard),
  deleteOneBoard: trycatch(deleteOneBoard),
  patchOneBoard: trycatch(patchOneBoard),
};
