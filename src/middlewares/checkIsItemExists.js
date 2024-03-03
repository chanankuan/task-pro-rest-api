import { HttpError } from '../helpers/index.js';

export const checkIsItemExists = (type, id) => async (req, _, next) => {
  const isItemExists = await type.exists({ _id: req.params[id] });

  if (!isItemExists) {
    next(HttpError(404));
  }

  next();
};
