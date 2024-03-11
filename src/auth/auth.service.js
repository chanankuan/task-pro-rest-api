import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import dotenvConfig from '../dotenvConfig.js';
import { HttpError } from '../helpers/index.js';

const { SECRET_KEY } = dotenvConfig;

const registerUser = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const newUser = await User.create({ name, email, password });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(newUser._id, { token });

  newUser.password = undefined;
  newUser.token = token;

  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await user.comparePassword(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  user.token = token;
  user.password = undefined;

  return user;
};

const logoutUser = async userId => {
  await User.findByIdAndUpdate(userId, { token: '' });
};

export default {
  registerUser,
  loginUser,
  logoutUser,
};
