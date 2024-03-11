import express from 'express';
import authController from '../auth/auth.controller.js';
import { registerSchema, loginSchema } from '../user/user.schema.js';
import { authenticate, validateBody } from '../middlewares/index.js';

const authRouter = express.Router();

authRouter.get('/google', authController.googleAuth);

authRouter.get('/google-redirect', authController.googleRedirect);

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authController.registerUser
);
authRouter.post('/login', validateBody(loginSchema), authController.loginUser);
authRouter.post('/logout', authenticate, authController.logoutUser);

export default authRouter;
