import { trycatch } from '../helpers/index.js';

const getCurrentUser = async (req, res) => {
  // Please, use service for communication with DB
};

const updateUser = async (req, res) => {
  // Please, use service for communication with DB
  const user = await authService.updateUser(req.body, req.file);

  res.json(user);
};

export default {
  getCurrentUser: trycatch(getCurrentUser),
  updateUser: trycatch(updateUser),
};
