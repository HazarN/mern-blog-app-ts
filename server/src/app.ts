import express, { Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRouter from './auth/auth.router';
import usersRouter from './routes/users/users.router';
import postsRouter from './routes/posts/posts.router';

const app = express();

const API_BODY = 'api/v1';

const corsPolicy = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsPolicy));
app.use(cookieParser());

// server logging with an external package
app.use(morgan('short'));

app.use(`/${API_BODY}/auth`, authRouter);
app.use(`/${API_BODY}/users`, usersRouter);
app.use(`/${API_BODY}/posts`, postsRouter);

app.get('/', (_, res: Response) => {
  res.json({
    message: 'Hello, world!',
    status: 'The MERN Blog API is running!',
  });
});

export default app;
