import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './helpers/swaggerSetup.js';
import authRouter from './auth/auth.routes.js';
import boardRouter from './board/board.routes.js';
import cardRouter from './card/card.routes.js';

export const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', authRouter);

app.use('/api/boards', boardRouter);

app.use('/api/cards', cardRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
