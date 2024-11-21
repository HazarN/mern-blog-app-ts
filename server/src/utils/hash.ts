import bcrypt from 'bcrypt';

import mongoUtils from './mongo';
import displayMessage from './display';

// It is used for old passwords to hash
/* import usersModel from '../models/users/users.model'; */

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// The code down below was run for the older version of the Mongo database that doesn't have hashed passwords

/* async function hashSyncDatabase(): Promise<void> {
  await mongoUtils.connectToMongo();

  const users = await usersModel.getUsers(true);

  for (const user of users) {
    if (!user.password.startsWith('$2b$')) {
      user.password = await hashPassword(user.password);
      await user.save();
    }
  }

  await mongoUtils.disconnectFromMongo();
  displayMessage('Old passwords hashed succesfully', '-');
} 

hashSyncDatabase().catch((err) => {
  displayMessage(`Error hashing old passwords: ${err}`, '*');
  process.exit(1);
}); */

export default {
  hashPassword,
  comparePassword,
};
