import { Schema, Document } from 'mongoose';

export default interface IPost extends Document {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  lastUpdate: Date;

  user: Schema.Types.ObjectId; // Many-to-One relationship
}
