import { Schema, model } from 'mongoose';

const columnSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'Set FE id for column'],
    },
    title: {
      type: String,
      required: [true, 'Set title for column'],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

//needs test
// columnSchema.pre('remove', async function (next) {
//   try {
//     // Access the Column model
//     const Column = mongoose.model('Column');

//     // Delete all cards associated with this column
//     await Column.model('Card').deleteMany({ column: this._id });

//     // Continue with the remove operation
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

export const Column = model('Column', columnSchema);
