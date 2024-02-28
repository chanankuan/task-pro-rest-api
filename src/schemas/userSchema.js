import Joi from 'joi';

const emailRegex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" cannot be an empty field',
    'any.required': 'missing required field "name"',
  }),
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
    'string.empty': '"email" cannot be an empty field',
    'any.required': 'missing required field "email"',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': '"password" cannot be an empty field',
    'string.min': '"password" should have a minimum length of 6',
    'any.required': 'missing required field "password"',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
    'string.empty': '"email" cannot be an empty field',
    'any.required': 'missing required field "email"',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"password" cannot be an empty field',
    'any.required': 'missing required field "password"',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    'string.empty': '"name" cannot be an empty field',
  }),
  email: Joi.string().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
    'string.empty': '"email" cannot be an empty field',
  }),
  password: Joi.string().min(6).messages({
    'string.empty': '"password" cannot be an empty field',
    'string.min': '"password" should have a minimum length of 6',
  }),
  avatarUrl: Joi.string(),
});
