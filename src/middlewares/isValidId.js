import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers';

export const validateId = async id => {
  const func = (req, _, next) => {
    if (!isValidObjectId(req.params[id])) {
      next(HttpError(400, 'Invalid id'));
    }

    next();
  };

  return func;
};
