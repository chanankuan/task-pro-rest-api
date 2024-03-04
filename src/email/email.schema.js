import Joi from 'joi';

export const supportEmailSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': '"email" cannot be an empty field',
    'any.required': 'missing required field "email"',
  }),
  comment: Joi.string().required().messages({
    'number.empty': '"comment" cannot be an empty field',
    'any.required': 'missing required field "comment"',
  }),
});
