import jwt from 'jsonwebtoken';
import { Token } from '../token/token.model.js';
import dotenvConfig from '../dotenvConfig.js';

const { KEY_ACCESS, KEY_REFRESH } = dotenvConfig;

const generateTokens = payload => {
  const tokenAccess = jwt.sign(payload, KEY_ACCESS, {
    expiresIn: '3d',
  });
  const refreshToken = jwt.sign(payload, KEY_REFRESH, {
    expiresIn: '30d',
  });
  return {
    tokenAccess,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({
    user: userId,
    refreshToken,
  });
  return token;
};

const removeToken = async refreshToken => {
  const filter = { refreshToken };
  const token = await Token.deleteOne(filter);
  return token;
};

const validateAccessToken = token => {
  try {
    const user = jwt.verify(token, KEY_ACCESS);
    return user;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = token => {
  try {
    const user = jwt.verify(token, KEY_REFRESH);
    return user;
  } catch (e) {
    return null;
  }
};

const findToken = async refreshToken => {
  const filter = { refreshToken };
  const token = await Token.findOne(filter);
  return token;
};

export default {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
