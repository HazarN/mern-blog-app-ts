import dotenv from 'dotenv';
import { createServer } from 'http';

import app from './app';

import mongoUtils from './utils/mongo';
import displayMessage from './utils/display';

dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 8081;

(async function initServer() {
  await mongoUtils.connectToMongo();

  server.listen(PORT, () =>
    console.log(
      displayMessage(`Server available at http://localhost:${PORT}`, '-')
    )
  );
})();
