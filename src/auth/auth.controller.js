import authService from './auth.service.js';
import { trycatch } from '../helpers/index.js';
import queryString from 'query-string';
import axios from 'axios';
import dotenvConfig from '../dotenvConfig.js';
import { User } from '../user/user.model.js';

const { BASE_URL, FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  dotenvConfig;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser({ name, email, password });
  // res.cookie('refreshToken', user.refreshToken, {
  //   maxAge: 2592000000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'None',
  // });

  res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUser({ email, password });
  // res.cookie('refreshToken', user.refreshToken, {
  //   maxAge: 2592000000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'None',
  // });

  res.status(200).json({ user });
};

const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;
  await authService.logoutUser(refreshToken);
  // res.clearCookie('refreshToken');

  res.status(200).json({
    message: 'Logout success',
  });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const user = await authService.refresh(refreshToken);
  // res.cookie('refreshToken', user.refreshToken, {
  //   maxAge: 2592000000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'None',
  // });

  res.status(200).json({ user });
};

const googleAuth = async (req, res) => {
  console.log(`${BASE_URL}/auth/google-redirect`);
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  console.log(`${BASE_URL}/auth/google-redirect`);
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;
  console.log(`${BASE_URL}/auth/google-redirect`);
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
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

  let user = await User.findOne({ email: userData.data.email });

  if (!user) {
    user = await User.create({
      name: userData.data.name,
      email: userData.data.email,
      password: 'someRandomPassword',
    });
  }

  const loginResponse = await authService.loginUser({
    email: user.email,
    password: 'someRandomPassword',
  });

  res.status(201).json({ user: loginResponse });

  // res.cookie('refreshToken', loginResponse.refreshToken, {
  //   maxAge: 2592000000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'None',
  // });

  return res.redirect(`${FRONTEND_URL}?token=${loginResponse.tokenAccess}`);
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  logoutUser: trycatch(logoutUser),
  refresh: trycatch(refresh),
  googleAuth: trycatch(googleAuth),
  googleRedirect: trycatch(googleRedirect),
};
