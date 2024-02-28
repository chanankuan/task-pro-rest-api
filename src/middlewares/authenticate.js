import jwt from 'jsonwebtoken';
import config from '../dotenvConfig.js';
import { authService } from '../services/index.js';
import { HttpError } from '../helpers/index.js';

export const authenticate = async (req, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(' ') || [];

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, config.SECRET_KEY);
    const user = await service.findUserById(id);

    if (!user || !user.token) {
      next(HttpError(401, 'Not authorized'));
    }

    req.user = user;
  } catch (error) {
    next(HttpError(401, 'Not authorized'));
  }

  next();
};
