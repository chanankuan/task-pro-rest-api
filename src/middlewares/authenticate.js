import jwt from 'jsonwebtoken';
import dotenvConfig from '../dotenvConfig.js';
import { HttpError } from '../helpers/index.js';
import { User } from '../model/index.js';

const { SECRET_KEY } = dotenvConfig;

export const authenticate = async (req, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(' ') || [];

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
    return;
  }

  try {
    const { id: userId } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: userId });

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized'));
      return;
    }

    req.user = user;
  } catch (error) {
    console.log(error);
    next(HttpError(401, 'Not authorized'));
  }

  return next();
};
