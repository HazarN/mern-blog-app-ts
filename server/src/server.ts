import dotenv from 'dotenv';
import { createServer } from 'http';

import app from './app';
import displayMessage from './utils/display';
import mongoUtils from './utils/mongo';

// in order to use the .env file
dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 8081;

(async function startUp() {
  await mongoUtils.connectToMongo();

  server.listen(PORT, () =>
    console.log(
      displayMessage(`Server available at http://localhost:${PORT}`, '-')
    )
  );
})();
