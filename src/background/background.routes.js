import express from 'express';
import backgroundController from './background.controller.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const backgroundRouter = express.Router();

backgroundRouter.get('/', backgroundController.getAllMinBackgrounds);

export default backgroundRouter;
