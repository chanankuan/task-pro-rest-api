import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for board'],
    },
    icon_id: {
      type: Number,
      required: [true, 'Set id for icon'],
    },
    background: {
      type: Schema.Types.ObjectId,
      ref: 'Background',
      required: [true, 'Set background id for board'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Board = model('Board', boardSchema);
