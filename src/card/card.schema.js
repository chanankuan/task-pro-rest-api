import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"title" cannot be an empty field',
    'any.required': 'missing required field "title"',
  }),
  description: Joi.string().required().messages({
    'number.empty': '"description" cannot be an empty field',
    'any.required': 'missing required field "description"',
  }),
  priority: Joi.string()
    .required()
    .valid('without priority', 'low', 'medium', 'high')
    .messages({
      'string.empty': '"priority" cannot be an empty field',
      'any.required': 'missing required field "priority"',
    }),
  deadline: Joi.date().greater('now').required().messages({
    'string.empty': '"deadline" cannot be an empty field',
    'any.required': 'missing required field "deadline"',
  }),
});
