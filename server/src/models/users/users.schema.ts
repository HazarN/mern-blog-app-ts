import mongoose, { Document, Schema } from 'mongoose';

import hashUtils from '../../utils/hash';
import IUser from './IUser';

const userSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Implement the password hashing before saving the user
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await hashUtils.hashPassword(this.password);

  return next();
});

export default mongoose.model<IUser>('User', userSchema);
