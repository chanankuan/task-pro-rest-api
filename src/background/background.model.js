import { Schema, model } from 'mongoose';

const backgroundSchema = new Schema(
  {
    backgroundDesktopURL: {
      type: String,
      required: [true, 'Set desktop url for background'],
    },
    backgroundDesktop2xURL: {
      type: String,
      required: [true, 'Set desktop url for background'],
    },
    backgroundTabletURL: {
      type: String,
      required: [true, 'Set tablet url for background'],
    },
    backgroundTablet2xURL: {
      type: String,
      required: [true, 'Set tablet url for background'],
    },
    backgroundMobileURL: {
      type: String,
      required: [true, 'Set moible url for background'],
    },
    backgroundMobile2xURL: {
      type: String,
      required: [true, 'Set moible url for background'],
    },
    backgroundMinURL: {
      type: String,
      required: [true, 'Set min url for background'],
    },
    backgroundMin2xURL: {
      type: String,
      required: [true, 'Set min url for background'],
    },
    type: {
      type: String,
      enum: ['custom', 'default'],
      default: 'custom',
      required: [true, 'Set type for background'],
    },
  },
  { versionKey: false, timestamps: true }
);

export const Background = model('Background', backgroundSchema);
