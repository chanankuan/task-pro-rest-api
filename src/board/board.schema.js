import Joi from 'joi';

export const boardSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"name" cannot be an empty field',
    'any.required': 'missing required field "name"',
  }),
  iconId: Joi.number().required().messages({
    'number.empty': '"iconId" cannot be an empty field',
    'any.required': 'missing required field "iconId"',
  }),
  backgroundURL: Joi.string().required().messages({
    'string.empty': '"backgroundURL" cannot be an empty field',
    'any.required': 'missing required field "backgroundURL"',
  }),
});
