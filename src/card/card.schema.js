import Joi from 'joi';
import { getDate } from '../helpers/getDate.js';

const date = getDate();

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
  deadline: Joi.date().min(date).required().messages({
    'date.min': '"deadline" can not be less than the current date',
    'string.empty': '"deadline" cannot be an empty field',
    'any.required': 'missing required field "deadline"',
  }),
  board: Joi.string().required().messages({
    'string.base': '"board" must be a string',
    'any.required': 'missing required field "boardId"',
  }),
  column: Joi.string().required().messages({
    'string.base': '"column" must be a string',
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
  deadline: Joi.date().min(date).messages({
    'string.base': '"deadline" must be a string',
    'date.min': '"deadline" can not be less than the current date',
  }),
  board: Joi.string().required().messages({
    'string.base': '"board" must be a string',
    'any.required': 'missing required field "boardId"',
  }),
  column: Joi.string().required().messages({
    'string.base': '"column" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
});
