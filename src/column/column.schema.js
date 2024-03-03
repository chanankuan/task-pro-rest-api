import Joi from 'joi';

export const columnSchema = Joi.object({
  // id: Joi.string().required().messages({
  //   'string.empty': '"id" cannot be an empty field',
  //   'any.required': 'missing required field "id"',
  // }),
  title: Joi.string().required().messages({
    'string.empty': '"title" cannot be an empty field',
    'any.required': 'missing required field "title"',
  }),
  board: Joi.string().required().messages({
    'string.empty': '"board" cannot be an empty field',
    'any.required': 'missing required field "board"',
  }),
});
