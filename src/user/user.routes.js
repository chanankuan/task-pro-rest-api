import express from 'express';
import userController from '../user/user.controller.js';
import { updateUserSchema } from '../user/user.schema.js';
import { authenticate, validateBody, upload } from '../middlewares/index.js';

const userRouter = express.Router();

userRouter.get('/current', authenticate, userController.getCurrentUser);
userRouter.patch(
  '/current',
  authenticate,
  validateBody(updateUserSchema),
  upload.single('avatarUrl'),
  userController.updateUser
);

export default userRouter;
