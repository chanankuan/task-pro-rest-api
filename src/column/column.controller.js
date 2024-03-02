import columnService from './column.service.js';
import { trycatch } from '../helpers/trycatch.js';

const getAllcolumns = async (req, res) => {
  // get all columns
};

const getOnecolumn = async (req, res) => {
  // get one column
};

const createOnecolumn = async (req, res) => {
  // create one column
};

const deleteOnecolumn = async (req, res) => {
  // delete one column
};

const patchOnecolumn = async (req, res) => {
  // patch one column
};

export default {
  getAllcolumns: trycatch(getAllcolumns),
  getOnecolumn: trycatch(getOnecolumn),
  createOnecolumn: trycatch(createOnecolumn),
  deleteOnecolumn: trycatch(deleteOnecolumn),
  patchOnecolumn: trycatch(patchOnecolumn),
};
