import { Response } from 'express';
import { Schema } from 'mongoose';

import { IRequest } from '../../../types/express';
import IPost from '../../models/posts/IPost';
import Exceptions from '../../utils/Exceptions';
import postsModel from '../../models/posts/posts.model';
import usersModel from 'src/models/users/users.model';

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

// GET /posts/id
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

// GET /posts/user/userId
async function httpGetUserPosts(
  req: IRequest<{
    userId: string;
  }>,
  res: Response
): Promise<void> {
  const userId = Number(req.params.userId);

  try {
    const user = await usersModel.getUserById(userId, true);

    if (!user) return Exceptions.notFound(res, 'User not found');

    const posts: IPost[] | null = await postsModel.getUserPosts(
      user._id as Schema.Types.ObjectId,
      true
    );

    if (!posts) return Exceptions.notFound(res, 'Posts not found');

    res.status(200).json({ posts, from: { userName: user.name } });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

// POST /posts/userId
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

// POST /posts
async function httpAddPostToCurrentUser(
  req: IRequest<{}, {}, IPostBody>,
  res: Response
): Promise<void> {
  const { title, content } = req.body;
  const userId = Number(req.userPayload?.id);

  try {
    const user = await usersModel.getUserById(userId, true);
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

// PUT /posts/id
async function httpUpdateUserPost(
  req: IRequest<{ id: string }, {}, IPostBody>,
  res: Response
): Promise<void> {
  const { title, content } = req.body;
  const id = Number(req.params.id);
  const userId = Number(req.userPayload?.id);

  try {
    const user = await usersModel.getUserById(userId, true);
    if (!user) return Exceptions.unauthorized(res, 'User not found');

    const post = await postsModel.getPostById(id);

    if (!post) return Exceptions.notFound(res, 'Post not found');

    if (String(post.user) !== String(user._id))
      return Exceptions.forbidden(res, 'Access denied');

    const updatedPost: IPost | null = await postsModel.updatePost(id, {
      title,
      content,
      lastUpdate: new Date(),
    });

    if (!updatedPost) return Exceptions.notFound(res, 'Post not found');

    res.status(200).json({ updatedPost, to: { userName: user.name } });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

// DELETE /posts/id
async function httpDeletePost(
  req: IRequest<{ id: string }>,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);
  const userId = Number(req.userPayload?.id);

  try {
    const post = await postsModel.getPostById(id);
    if (!post) return Exceptions.notFound(res, 'Post not found');

    const user = await usersModel.getUserById(userId, true);
    if (!user) return Exceptions.unauthorized(res, 'User not found');

    // User can only delete their own posts
    if (String(post.user) !== String(user._id))
      return Exceptions.forbidden(res, 'Access denied');

    const deletedPost = await postsModel.deletePost(id);

    if (!deletedPost) return Exceptions.notFound(res, 'Post not found');

    // remove the post from the user's posts
    user.posts = user.posts.filter(
      (posDashId) => String(posDashId) !== String(id)
    );
    await user.save();

    res.status(200).json({ deletedPost, from: { userName: user.name } });
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
  httpGetUserPosts,
  httpAddPostToAny,
  httpAddPostToCurrentUser,
  httpUpdateUserPost,
  httpDeletePost,
};
