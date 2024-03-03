import { Column } from './column.model.js';

const getAllColumns = async (owner, board) =>
  await Column.find({ owner, board });

const getOneColumn = async (id, owner) => await Column.find({ id, owner });

const createOneColumn = async (body, owner) =>
  await Column.create({ ...body, owner });

const deleteOneColumn = async (id, owner) =>
  await Column.findByIdAndDelete(id).where('owner').equals(owner);

const patchOneColumn = async (id, updates, owner) =>
  await Column.findByIdAndUpdate(id, updates, {
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
