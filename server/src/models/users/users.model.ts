import users from './users.schema';
import IUser from './IUser';

const DEFAULT_ID = 1000;

async function getLatestId(): Promise<number | null> {
  const latestUser: IUser | null = await users.findOne().sort('-id');

  if (!latestUser) return DEFAULT_ID;
  else return latestUser.id + 1;
}

export default {
  async getUsers(): Promise<IUser[]> {
    return await users.find({}, { _id: 0, __v: 0 });
  },

  async getUserById(id: number): Promise<IUser | null> {
    return await users.findOne({ id }, { _id: 0, __v: 0 });
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
};
