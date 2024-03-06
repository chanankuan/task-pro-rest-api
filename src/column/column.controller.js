import columnService from './column.service.js';
import { trycatch } from '../helpers/trycatch.js';
import { HttpError } from '../helpers/HttpError.js';

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const { board } = req.body;

  const columns = await columnService.getAllColumns(owner, board);

  res.status(200).json({ columns });
};

const getOneColumn = async (req, res) => {
  const { columnId } = req.params;
  if (!columnId) throw HttpError(401);

  const { _id: owner } = req.user;

  const column = await columnService.getOneColumn(columnId, owner);

  if (!column) throw HttpError(404);

  res.status(200).json({ column });
};

const createOneColumn = async (req, res) => {
  const { _id: owner } = req.user;

  const newColumn = await columnService.createOneColumn(req.body, owner);

  res.status(201).json({ column: newColumn });
};

const deleteOneColumn = async (req, res) => {
  const { columnId } = req.params;
  if (!columnId) throw HttpError(401);

  const { _id: owner } = req.user;

  const column = await columnService.deleteOneColumn(columnId, owner);

  if (!column) throw HttpError(404);

  res.status(200).json({ message: 'Column deleted successfully' });
};

const patchOneColumn = async (req, res) => {
  const { columnId } = req.params;
  if (!columnId) throw HttpError(401);

  const { _id: owner } = req.user;

  const updates = req.body;

  const updatedColumn = await columnService.patchOneColumn(
    columnId,
    updates,
    owner
  );

  if (!updatedColumn) throw HttpError(404);

  res.status(200).json({ column: updatedColumn });
};

export default {
  getAllColumns: trycatch(getAllColumns),
  getOneColumn: trycatch(getOneColumn),
  createOneColumn: trycatch(createOneColumn),
  deleteOneColumn: trycatch(deleteOneColumn),
  patchOneColumn: trycatch(patchOneColumn),
};
