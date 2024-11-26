import { Request, Response } from 'express';

import IUser from '../../models/users/IUser';
import usersModel from '../../models/users/users.model';
import Exceptions from '../../utils/Exceptions';
import hashUtils from '../../utils/hash';
import IPost from 'src/models/posts/IPost';
import postsModel from 'src/models/posts/posts.model';
import { Schema } from 'mongoose';

// GET /users
async function httpGetUsers(_: Request, res: Response): Promise<void> {
  try {
    const users: IUser[] | null = await usersModel.getUsers();

    if (!users) Exceptions.notFound(res, 'Users not found');

    res.status(200).json(users);
  } catch (err) {
    Exceptions.internal(res, 'Check the terminal for more information', err);
  }
}

// GET /users/id
async function httpGetUserById(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const { id } = req.params;

  try {
    const user: IUser | null = await usersModel.getUserById(Number(id));

    if (!user) return Exceptions.notFound(res, 'User not found');

    res.status(200).json(user);
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

// PUT /users/id
async function httpUpdateUser(
  req: Request<{ id: string }, {}, IUser>,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  try {
    const userBody: IUser = req.body;

    if (userBody.password && !userBody.password.startsWith('$2b$')) {
      userBody.password = await hashUtils.hashPassword(userBody.password);
    }

    const userBeforeUpdate: IUser | null = await usersModel.getUserById(id);

    // isAdmin is not allowed to be updated
    if (userBody.isAdmin !== userBeforeUpdate?.isAdmin)
      return Exceptions.forbidden(res, 'You cannot change the isAdmin status');

    const updatedUser: IUser | null = await usersModel.updateUser(
      Number(id),
      userBody
    );

    if (!updatedUser) return Exceptions.notFound(res, 'User not found');

    res.status(200).json(userBody);
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

// when deleting a user, all the posts of that user should be deleted as well
async function httpDeleteUser(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  try {
    const user: IUser | null = await usersModel.getUserById(id, true);
    const userPosts = await postsModel.deletePostsByUserId(
      user?._id as Schema.Types.ObjectId
    );
    const deletedUser: IUser | null = await usersModel.deleteUser(id);

    if (!deletedUser)
      return Exceptions.notFound(
        res,
        'Cannot delete user, it already does not exist'
      );

    res.status(200).json({ deletedUser, posts: userPosts });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

export default {
  httpGetUsers,
  httpGetUserById,
  httpUpdateUser,
  httpDeleteUser,
};
