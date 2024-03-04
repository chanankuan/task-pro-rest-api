import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    theme: {
      type: String,
      enum: ['system', 'light', 'violet', 'dark'],
      default: 'system',
    },
    avatar_url: { type: String, default: 'default' },
    token: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = model('User', userSchema);
