import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"name" cannot be an empty field',
    'any.required': 'missing required field "name"',
  }),
  iconId: Joi.number().default(0),
  backgroundId: Joi.string(),
  background: Joi.object({
    filename: Joi.string().required(),
    path: Joi.string().required(),
    headers: Joi.object({
      'content-disposition': Joi.string().required(),
      'content-type': Joi.string().required(),
    }).required(),
    bytes: Joi.number().required(),
  }),
});

export const patchBoardSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': '"name" cannot be an empty field',
  }),
  iconId: Joi.number().messages({
    'number.empty': '"iconId" cannot be an empty field',
  }),
  backgroundId: Joi.string().messages({
    'string.empty': '"backgroundId" cannot be an empty field',
  }),
});
