import express from 'express';
import authController from '../auth/auth.controller.js';
import userController from '../user/user.controller.js';
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from '../user/user.schema.js';
import { authenticate, validateBody, upload } from '../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authController.registerUser
);
authRouter.post('/login', validateBody(loginSchema), authController.loginUser);
authRouter.use(authenticate);
authRouter.post('/logout', authController.logoutUser);
authRouter.get('/current', userController.getCurrentUser);
authRouter.patch(
  '/current',
  validateBody(updateUserSchema),
  upload.single('avatarUrl'),
  userController.updateUser
);

export default authRouter;
