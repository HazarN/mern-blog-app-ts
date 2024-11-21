import express, { Request, Response } from 'express';
import morgan from 'morgan';

import usersRouter from './routes/users/users.router';
import authRouter from './auth/auth.router';

const app = express();
const API_BODY = 'api/v1';

app.use(express.json());

// server logging with an external package
app.use(morgan('short'));

app.use(`/${API_BODY}/auth`, authRouter);
app.use(`/${API_BODY}/users`, usersRouter);

app.get('/', (_: Request, res: Response) => {
  res.json({
    message: 'Hello, world!',
    status: 'The MERN Blog API is running!',
  });
});

export default app;
