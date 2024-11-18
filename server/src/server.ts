import dotenv from 'dotenv';
import { createServer } from 'http';

import app from './app';

dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
