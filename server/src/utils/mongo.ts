import dotenv from 'dotenv';
import mongoose from 'mongoose';

import displayMessage from './display';

// in order to get the database credentials from the .env file
dotenv.config();

async function connectToMongo(): Promise<void> {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mern-blog-api.1ytwe.mongodb.net/`
  );
}

async function disconnectFromMongo(): Promise<void> {
  await mongoose.disconnect();
}

// notify when the connection is open
mongoose.connection.once('open', () =>
  console.log(displayMessage('Connected to MongoDB', '='))
);

// notify if there is an error while trying to connect
mongoose.connection.on('error', (err) => console.error(err));

export default {
  connectToMongo,
  disconnectFromMongo,
};
