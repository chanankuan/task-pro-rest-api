import { trycatch } from '../helpers/index.js';
import userService from './user.service.js';

const getCurrentUser = async (req, res) => {
  // Please, use service for communication with DB
};

const updateUser = async (req, res) => {
  // Please, use service for communication with DB
  const user = await userService.updateUser(req.body, req.file);

  res.json(user);
};

const updateTheme = async (req, res) => {
  const { _id: userId } = req.user;
  const { theme } = req.body;

  const user = await userService.updateTheme(userId, theme);
  res.json({ user });
};

export default {
  getCurrentUser: trycatch(getCurrentUser),
  updateUser: trycatch(updateUser),
  updateTheme: trycatch(updateTheme),
};
