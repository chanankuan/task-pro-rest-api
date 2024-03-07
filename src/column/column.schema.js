import Joi from 'joi';

export const columnSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"title" cannot be an empty field',
    'any.required': 'missing required field "title"',
  }),
  board: Joi.string().required().messages({
    'string.empty': '"boardId" cannot be an empty field',
    'any.required': 'missing required field "boardId"',
  }),
});
