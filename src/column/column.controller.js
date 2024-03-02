import columnService from './column.service.js';
import { trycatch } from '../helpers/trycatch.js';

const getAllcolumns = (req, res) => {
  // get all columns
};

const getOnecolumn = (req, res) => {
  // get one column
};

const createOnecolumn = (req, res) => {
  // create one column
};

const deleteOnecolumn = (req, res) => {
  // delete one column
};

const patchOnecolumn = (req, res) => {
  // patch one column
};

export default {
  getAllcolumns: trycatch(getAllcolumns),
  getOnecolumn: trycatch(getOnecolumn),
  createOnecolumn: trycatch(createOnecolumn),
  deleteOnecolumn: trycatch(deleteOnecolumn),
  patchOnecolumn: trycatch(patchOnecolumn),
};
