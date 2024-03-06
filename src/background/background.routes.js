import express from 'express';
import backgroundController from './background.controller.js';
import { authenticate } from '../middlewares/index.js';

const backgroundRouter = express.Router();

backgroundRouter.get(
  '/',
  authenticate,
  backgroundController.getAllMinBackgrounds
);

export default backgroundRouter;
