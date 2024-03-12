import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './helpers/swaggerSetup.js';
import authRouter from './auth/auth.routes.js';
import userRouter from './user/user.routes.js';
import boardRouter from './board/board.routes.js';
import cardRouter from './card/card.routes.js';
import columnRouter from './column/column.routes.js';
import backgroundRouter from './background/background.routes.js';
import emailRouter from './email/email.routes.js';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(morgan('tiny'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/api/boards', boardRouter);

app.use('/api/columns', columnRouter);

app.use('/api/cards', cardRouter);

app.use('/api/backgrounds', backgroundRouter);

app.use('/email', emailRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
