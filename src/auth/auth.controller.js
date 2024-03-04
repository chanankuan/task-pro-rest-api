import authService from './auth.service.js';
import { trycatch } from '../helpers/index.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({ name, email, password });

  res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUser({ email, password });

  res.status(200).json({ user })
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  await authService.logoutUser(_id);

  res.status(200).json({
    message: "Logout success"
  })
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  logoutUser: trycatch(logoutUser),
};
