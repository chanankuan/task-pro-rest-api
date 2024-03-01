import authService from './auth.service.js';
import { HttpError, trycatch } from '../helpers/index.js';

const registerUser = async (req, res) => {
  // Please, use service for communication with DB
};

const loginUser = async (req, res) => {
  // Please, use service for communication with DB
};

const getCurrentUser = async (req, res) => {
  // Please, use service for communication with DB
};

const logoutUser = async (req, res) => {
  // Please, use service for communication with DB
};

const updateUser = async (req, res) => {
  // Please, use service for communication with DB
  const user = await authService.updateUser(req.body, req.file);

  res.json(user);
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  getCurrentUser: trycatch(getCurrentUser),
  logoutUser: trycatch(logoutUser),
  updateUser: trycatch(updateUser),
};
