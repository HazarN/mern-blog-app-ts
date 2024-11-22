import mongoose from 'mongoose';

import IPost from './IPost';

const postsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },

  // Many-to-One relationship
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<IPost>('Post', postsSchema);
