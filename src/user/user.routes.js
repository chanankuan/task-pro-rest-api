import express from 'express';
import userController from '../user/user.controller.js';
import { updateThemeSchema, updateUserSchema } from '../user/user.schema.js';
import { authenticate, validateBody, upload } from '../middlewares/index.js';
import { ImageService } from '../image/image.service.js';

const userRouter = express.Router();

userRouter.get('/current', authenticate, userController.getCurrentUser);
userRouter.patch(
  '/current',
  authenticate,
  validateBody(updateUserSchema),
  ImageService.saveOriginalTemporaryFile('avatar_url', 'avatars'),
  userController.updateUser
);
userRouter.patch(
  '/current/theme',
  authenticate,
  validateBody(updateThemeSchema),
  userController.updateTheme
);

export default userRouter;
