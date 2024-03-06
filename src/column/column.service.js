import { Column } from './column.model.js';
import { Card } from '../card/card.model.js';

const getAllColumns = async (owner, board) =>
  await Column.find({ owner, board });

const getOneColumn = async (_id, owner) => await Column.find({ _id, owner });

const createOneColumn = async (body, owner) =>
  await Column.create({ ...body, owner });

const deleteOneColumn = async (columnId, owner) => {
  await Column.findByIdAndDelete(columnId).where('owner').equals(owner);
  await Card.deleteMany({ column: columnId });
};

const patchOneColumn = async (_id, updates, owner) =>
  await Column.findByIdAndUpdate(_id, updates, {
    new: true,
  })
    .where('owner')
    .equals(owner);

export default {
  getAllColumns,
  getOneColumn,
  createOneColumn,
  deleteOneColumn,
  patchOneColumn,
};
