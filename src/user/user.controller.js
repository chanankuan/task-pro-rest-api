import { trycatch } from '../helpers/index.js';
import userService from './user.service.js';

const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatar_url, theme, tokenAccess } = req.user;

  res.json({
    user: { _id, name, email, avatar_url, theme, tokenAccess },
  });
};

const updateUser = async (req, res) => {
  const { _id: userId } = req.user;
  const { body, file } = req;
  const user = await userService.updateUser(userId, body, file);

  res.json({ user });
};

const updateTheme = async (req, res) => {
  const { _id: userId } = req.user;
  const { theme } = req.body;

  const user = await userService.updateTheme(userId, theme);
  res.json({ theme: user.theme });
};

export default {
  getCurrentUser: trycatch(getCurrentUser),
  updateUser: trycatch(updateUser),
  updateTheme: trycatch(updateTheme),
};
