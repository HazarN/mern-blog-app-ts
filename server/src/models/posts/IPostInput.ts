import { Schema } from 'mongoose';

export default interface IPostInput {
  title: string;
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  user: Schema.Types.ObjectId;
}
