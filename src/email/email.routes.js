import express from 'express';
import mailController from './email.controller.js';
import { supportEmailSchema } from './email.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const emailRouter = express.Router();

emailRouter.post(
  '/support',
  authenticate,
  validateBody(supportEmailSchema),
  mailController.sendHelpEmail
);

export default emailRouter;
