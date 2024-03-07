import Joi from 'joi';

export const createCardSchema = Joi.object({
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
      'any.only':
        '"priority" must be one of the following values: without priority, low, medium, high',
    }),
  deadline: Joi.date().min(new Date()).required().messages({
    'date.min': '"deadline" can not be less than the current date',
    'string.empty': '"deadline" cannot be an empty field',
    'any.required': 'missing required field "deadline"',
  }),
  boardId: Joi.string().required().messages({
    'string.base': '"boardId" must be a string',
    'any.required': 'missing required field "boardId"',
  }),
  columnId: Joi.string().required().messages({
    'string.base': '"columnId" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
});

export const deleteCardSchema = Joi.object({
  boardId: Joi.string().required().messages({
    'string.base': '"boardId" must be a string',
    'any.required': 'missing required field "boardId"',
  }),
  columnId: Joi.string().required().messages({
    'string.base': '"columnId" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
});

export const patchCardSchema = Joi.object({
  title: Joi.string().messages({
    'string.base': '"title" must be a string',
  }),
  description: Joi.string().messages({
    'string.base': '"description" must be a string',
  }),
  priority: Joi.string()
    .valid('without priority', 'low', 'medium', 'high')
    .messages({
      'string.base': '"priority" must be a string',
      'any.only':
        '"priority" must be one of the following values: without priority, low, medium, high',
    }),
  deadline: Joi.date().min(new Date()).messages({
    'string.base': '"deadline" must be a string',
    'date.min': '"deadline" can not be less than the current date',
  }),
  boardId: Joi.string().required().messages({
    'string.base': '"boardId" must be a string',
    'any.required': 'missing required field "boardId"',
  }),
  columnId: Joi.string().required().messages({
    'string.base': '"columnId" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
});
