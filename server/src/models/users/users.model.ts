import { DeleteResult } from 'mongoose';

import IUser from './IUser';
import users from './users.schema';

const DEFAULT_ID = 1000;

async function getLatestId(): Promise<number | null> {
  const latestUser: IUser | null = await users.findOne().sort('-id');

  if (!latestUser) return DEFAULT_ID;
  else return latestUser.id + 1;
}

export default {
  async getUsers(wantDashId: boolean = false): Promise<IUser[]> {
    return await users.find({}, { _id: Number(wantDashId), __v: 0 });
  },

  async getUserById(
    id: number,
    wantDashId: boolean = false
  ): Promise<IUser | null> {
    return await users.findOne({ id }, { _id: Number(wantDashId), __v: 0 });
  },

  async getUserByDashId(_id: string): Promise<IUser | null> {
    return await users.findOne({ _id }, { _id: 0, __v: 0 });
  },

  async getUserByEmail(
    email: string,
    wantDashId: boolean = false
  ): Promise<IUser | null> {
    return await users.findOne({ email }, { _id: Number(wantDashId), __v: 0 });
  },

  async getUserByRefreshToken(
    refreshToken: string,
    wantDashId: boolean = false
  ): Promise<IUser | null> {
    return await users.findOne(
      { refreshToken },
      { _id: Number(wantDashId), __v: 0 }
    );
  },

  async addUser(user: IUser): Promise<IUser | null> {
    const id = await getLatestId();

    return await users.create({ ...user, id });
  },
  async isUserExist(email: string): Promise<boolean> {
    const user: IUser | null = await users.findOne(
      { email },
      { _id: 0, __v: 0 }
    );

    return user !== null;
  },

  async updateUser(id: number, user: IUser): Promise<IUser | null> {
    return await users.findOneAndUpdate({ id }, { ...user, id }, { new: true });
  },

  async deleteUser(id: number): Promise<IUser | null> {
    return await users.findOneAndDelete({ id });
  },

  // this command is a deadly operation, use it with caution
  async deleteUsers(): Promise<DeleteResult> {
    return await users.deleteMany();
  },
};
