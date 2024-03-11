import { User } from '../user/user.model.js';
import { HttpError } from '../helpers/index.js';
import tokenService from '../token/token.service.js';

const registerUser = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const newUser = await User.create({ name, email, password });

  const payload = {
    id: newUser._id,
  };

  const tokens = tokenService.generateTokens(payload);

  await tokenService.saveToken(newUser._id, tokens.refreshToken);

  return {
    ...newUser.toObject(),
    ...tokens,
  };
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

  const tokens = tokenService.generateTokens(payload);

  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...user.toObject(),
    ...tokens,
  };
};

const refresh = async refreshToken => {
  if (!refreshToken) {
    throw HttpError(401, 'Refresh token is missing');
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw HttpError(401, 'Invalid refresh token');
  }

  const user = await User.findById(userData.id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  const payload = {
    id: user._id,
  };

  const tokens = tokenService.generateTokens(payload);

  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...user.toObject(),
    ...tokens,
  };
};

const logoutUser = async refreshToken => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refresh,
};
