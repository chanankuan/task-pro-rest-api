import express from 'express';
import { authController } from '../controllers/index.js';
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from '../schemas/index.js';
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
authRouter.get('/current', authController.getCurrentUser);
authRouter.patch(
  '/user',
  validateBody(updateUserSchema),
  upload.single('avatarUrl'),
  authController.updateUser
);

export default authRouter;
