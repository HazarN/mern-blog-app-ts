import { DeleteResult, Schema } from 'mongoose';

import posts from './posts.schema';
import IPost from './IPost';
import IPostInput from './IPostInput';

const DEFAULT_ID = 100;

async function getLatestId(): Promise<number> {
  const latestPost: IPost | null = await posts.findOne().sort('-id');

  if (!latestPost) return DEFAULT_ID;
  else return latestPost.id + 1;
}

export default {
  async getPosts(wantDashId: boolean = false): Promise<IPost[]> {
    return await posts.find({}, { _id: Number(wantDashId), __v: 0 });
  },

  async getPostById(
    id: number,
    wantDashId: boolean = false
  ): Promise<IPost | null> {
    return await posts.findOne({ id }, { _id: Number(wantDashId), __v: 0 });
  },

  async getUserPosts(
    userDashId: Schema.Types.ObjectId,
    wantDashId: boolean = false
  ): Promise<IPost[] | null> {
    return await posts.find(
      { user: userDashId },
      { _id: Number(wantDashId), __v: 0 }
    );
  },

  async addPost(post: IPostInput): Promise<IPost | null> {
    const id = await getLatestId();

    return await posts.create({ ...post, id });
  },

  async updatePost(
    id: number,
    post: { title: string; content: string; lastUpdate: Date }
  ): Promise<IPost | null> {
    return await posts.findOneAndUpdate({ id }, { ...post, id }, { new: true });
  },

  async deletePost(id: number): Promise<IPost | null> {
    return await posts.findOneAndDelete({ id });
  },

  async deletePostsByUserId(
    userDashId: Schema.Types.ObjectId
  ): Promise<DeleteResult> {
    return await posts.deleteMany({ user: userDashId });
  },
};
