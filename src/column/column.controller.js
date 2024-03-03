import columnService from './column.service.js';
import { trycatch } from '../helpers/trycatch.js';

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  //fetching all columns of a specific board
  const { board } = req.body;

  const columns = await columnService.getAllColumns(owner, board);

  res.status(200).json(columns);
};

const getOneColumn = async (req, res) => {
  //this is FE id, not the DB _id:
  const { columnId: id } = req.params.id;
  if (!id) throw HttpError(401);

  const { _id: owner } = req.user;

  const column = await columnService.getOneColumn(id, owner);

  if (!column) throw HttpError(404);

  res.status(200).json(column);
};

const createOneColumn = async (req, res) => {
  const { _id: owner } = req.user;

  const newColumn = await columnService.createOneColumn(req.body, owner);

  res.status(201).json(newColumn);
};

const deleteOneColumn = async (req, res) => {
  //this is FE id, not the DB _id:
  const { columnId: id } = req.params.id;
  if (!id) throw HttpError(401);

  const { _id: owner } = req.user;

  const column = await columnService.deleteOneColumn(id, owner);

  if (!column) {
    throw HttpError(404);
  }

  res.status(200).json({ column: column, message: 'Column was deleted' });
};

const patchOneColumn = async (req, res) => {
  //this is FE id, not the DB _id:
  const { columnId: id } = req.params.id;
  if (!id) throw HttpError(401);

  const { _id: owner } = req.user;

  const updates = req.body;

  const updatedColumn = await columnService.patchOneColumn(id, updates, owner);

  if (!updatedColumn) throw HttpError(404);

  res.status(200).json(updatedColumn);
};

export default {
  getAllColumns: trycatch(getAllColumns),
  getOneColumn: trycatch(getOneColumn),
  createOneColumn: trycatch(createOneColumn),
  deleteOneColumn: trycatch(deleteOneColumn),
  patchOneColumn: trycatch(patchOneColumn),
};
