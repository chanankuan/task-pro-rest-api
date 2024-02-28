import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

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
      enum: ['light', 'violet', 'dark'],
      default: 'light',
    },
    avatarURL: { type: String, default: '' },
    verify: {
      type: Boolean,
      default: false,
    },
    token: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function () {
  /**
   * generate hashed password
   * generate default user avatar
   * generate verification token
   */
  this.password = await bcrypt.hash(this.password, 10);
  this.avatarURL = gravatar.url(this.email);
  this.verificationToken = nanoid();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = model('User', userSchema);
