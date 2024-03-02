import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

export const validateId = id => {
  const func = async (req, _, next) => {
    if (!isValidObjectId(req.params[id])) {
      next(HttpError(400, 'Invalid id'));
    }

    next();
  };

  return func;
};
