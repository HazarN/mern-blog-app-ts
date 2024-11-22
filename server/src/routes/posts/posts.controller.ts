import { Response } from 'express';

import { IRequest } from '../../../types/express';
import IPost from '../../models/posts/IPost';
import Exceptions from '../../utils/Exceptions';
import postsModel from '../../models/posts/posts.model';
import usersModel from 'src/models/users/users.model';
import { Schema } from 'mongoose';

// GET /posts
async function httpGetPosts(req: IRequest, res: Response): Promise<void> {
  try {
    const posts: IPost[] | null = await postsModel.getPosts();

    console.log('posts', posts);

    if (!posts) return Exceptions.notFound(res, 'Posts not found');

    res.status(200).json(posts);
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

async function httpGetPostById(
  req: IRequest<{ id: number }>,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  try {
    const post: IPost | null = await postsModel.getPostById(id);

    if (!post) return Exceptions.notFound(res, 'Post not found');

    res.status(200).json(post);
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

interface IPostBody {
  title: string;
  content: string;
}
async function httpAddPostToAny(
  req: IRequest<{ userId: string }, {}, IPostBody>,
  res: Response
): Promise<void> {
  try {
    const userId = Number(req.params.userId);
    const { title, content } = req.body;

    const user = await usersModel.getUserById(userId, true);

    if (!user) return Exceptions.notFound(res, 'User not found');

    const createdAt = new Date();
    const lastUpdate = createdAt;
    const post: IPost | null = await postsModel.addPost({
      title,
      content,
      createdAt,
      lastUpdate,
      user: user._id as Schema.Types.ObjectId,
    });

    if (!post) return Exceptions.badRequest(res, 'Check the request body');

    // add the post to the user's posts as a ref
    user.posts.push(post._id as Schema.Types.ObjectId);
    await user.save();

    res.status(201).json({ post, to: { userName: user.name } });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

async function httpAddPostToCurrentUser(
  req: IRequest<{}, {}, IPostBody>,
  res: Response
): Promise<void> {
  const { title, content } = req.body;
  const userId = Number(req.userPayload?.id);

  const user = await usersModel.getUserById(userId, true);

  try {
    if (!user) return Exceptions.unauthorized(res, 'User not found');

    const createdAt = new Date();
    const lastUpdate = createdAt;
    const post: IPost | null = await postsModel.addPost({
      title,
      content,
      createdAt,
      lastUpdate,
      user: user._id as Schema.Types.ObjectId,
    });

    if (!post) return Exceptions.badRequest(res, 'Check the request body');

    // add the post to the user's posts as a ref
    user.posts.push(post._id as Schema.Types.ObjectId);
    await user.save();

    res.status(201).json({ post, to: { userName: user.name } });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

export default {
  httpGetPosts,
  httpGetPostById,
  httpAddPostToAny,
  httpAddPostToCurrentUser,
};
