import authService from './auth.service.js';
import { trycatch } from '../helpers/index.js';
import queryString from 'query-string';
import axios from 'axios';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({ name, email, password });

  res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUser({ email, password });

  res.status(200).json({ user });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  await authService.logoutUser(_id);

  res.status(200).json({
    message: 'Logout success',
  });
};

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  // +Логіка

  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
  );
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  logoutUser: trycatch(logoutUser),
  googleAuth: trycatch(googleAuth),
  googleRedirect: trycatch(googleRedirect),
};
