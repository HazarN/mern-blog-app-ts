import dotenv from 'dotenv';
import { createServer } from 'http';

import app from './app';
import displayMessage from './utils/display';
import mongoUtils from './utils/mongo';

// in order to use the .env file
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

//TODO: Implement the Authorization logic:
/* 
- Every endpoint should be protected for the non-authenticated users except for the /login and /register endpoints. DONE

- A user should be able to access their own data and manipulate it, but not the data of other users. FIXME

- An admin should be able to access all the data. FIXME
*/

//TODO: Start to implement the /posts endpoints
