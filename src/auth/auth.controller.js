import authService from './auth.service.js';
import { HttpError, trycatch } from '../helpers/index.js';

const registerUser = async (req, res) => {
  // Please, use service for communication with DB
};

const loginUser = async (req, res) => {
  // Please, use service for communication with DB
};

const logoutUser = async (req, res) => {
  // Please, use service for communication with DB
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  logoutUser: trycatch(logoutUser),
};
