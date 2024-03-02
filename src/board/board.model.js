import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for board'],
    },
    iconId: {
      type: Number,
      required: [true, 'Set id for icon'],
    },
    backgroundURL: {
      type: String,
      required: [true, 'Set background url for board'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Board = model('Board', boardSchema);
