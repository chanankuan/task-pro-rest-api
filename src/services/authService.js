import jwt from 'jsonwebtoken';
import { User } from '../model/index.js';
import dotenvConfig from '../dotenvConfig.js';

const { SECRET_KEY } = dotenvConfig;

const registerUser = async formData => {
  // Create user in db
};

const loginUser = async userId => {
  // Sign token and update it in db
};

const logoutUser = async userId => {
  // Remove token from db
};

const updateUser = async formData => {
  // Update user info in db
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
};
