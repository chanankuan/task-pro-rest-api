import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import dotenvConfig from '../dotenvConfig.js';
import { HttpError } from '../helpers/index.js';

const { SECRET_KEY } = dotenvConfig;

const registerUser = async ({ name, email, password }) => {
  // Create user in db
  // use save() method
};

const loginUser = async ({ email, password }) => {
  // Sign token and update it in db
};

const logoutUser = async userId => {
  // Remove token from db
};

export default {
  registerUser,
  loginUser,
  logoutUser,
};
