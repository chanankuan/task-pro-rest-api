import { Schema, model } from 'mongoose';

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for card'],
    },
    description: {
      type: String,
      required: [true, 'Set description for card'],
    },
    priority: {
      type: String,
      enum: ['without priority', 'low', 'medium', 'high'],
      required: [true, 'Set priority for card'],
      default: 'without priority',
    },
    deadline: {
      type: Date,
      required: [true, 'Set deadline date for card'],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Card = model('Card', cardSchema);
