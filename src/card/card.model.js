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
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Card = model('Card', cardSchema);
