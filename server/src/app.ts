import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());

// request logging
app.use(morgan('short'));

app.get('/', (_, res) => {
  res.json({
    message: 'Hello, world!',
    status: 'The MERN Blog Application API is running!',
  });
});

export default app;
