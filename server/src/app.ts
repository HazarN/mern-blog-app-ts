import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());

// server logging with an external package
app.use(morgan('short'));

app.get('/', (_, res) => {
  res.json({
    message: 'Hello, world!',
    status: 'The MERN Blog API is running!',
  });
});

export default app;
