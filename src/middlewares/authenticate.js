import { HttpError } from '../helpers/index.js';
import { User } from '../user/user.model.js';
import tokenService from '../token/token.service.js';

export const authenticate = async (req, _, next) => {
  const [bearer, accessToken] = req.headers.authorization?.split(' ') || [];
  const refreshToken = req.cookies.refreshToken;

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
    return;
  }

  try {
    const accessUser = tokenService.validateAccessToken(accessToken);
    const refreshTokenUser = tokenService.validateRefreshToken(refreshToken);

    if (!accessUser || !refreshTokenUser) {
      next(HttpError(401, 'Not authorized'));
      return;
    }

    const refreshTokenDB = await tokenService.findToken(refreshToken);

    if (!refreshTokenDB.refreshToken) {
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
