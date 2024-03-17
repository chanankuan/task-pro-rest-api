import { HttpError } from '../helpers/index.js';
import { User } from '../user/user.model.js';
import tokenService from '../token/token.service.js';

export const authenticate = async (req, _, next) => {
  const [bearer, accessToken] = req.headers.authorization?.split(' ') || [];

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
    return;
  }

  try {
    const accessUser = tokenService.validateAccessToken(accessToken);

    if (!accessUser) {
      next(HttpError(401, 'Not authorized'));
      return;
    }

    const user = await User.findById(accessUser.id);
    user.tokenAccess = accessToken;
    req.user = user;
  } catch (error) {
    console.log(error);
    next(HttpError(401, 'Not authorized'));
  }

  return next();
};
