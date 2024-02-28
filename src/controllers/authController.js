import { authService } from '../services/index.js';
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
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  getCurrentUser: trycatch(getCurrentUser),
  logoutUser: trycatch(logoutUser),
  updateUser: trycatch(updateUser),
};
