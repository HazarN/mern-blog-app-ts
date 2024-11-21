import { Document } from 'mongoose';

export default interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  refreshToken: string | null;
}
