import express, { Router } from 'express';

import postsController from './posts.controller';
import {
  isAuthenticated,
  restrict,
  allowSelfOrAdmin,
} from '../../auth/auth.middleware';

const postsRouter: Router = express.Router();

postsRouter.get('/', postsController.httpGetPosts);
postsRouter.get('/:id', postsController.httpGetPostById);
postsRouter.get(
  '/user/:userId',
  isAuthenticated,
  postsController.httpGetUserPosts
); // logged in user end-point

postsRouter.post('/:userId', postsController.httpAddPostToAny); // admin end-point
postsRouter.post(
  '/',
  isAuthenticated,
  postsController.httpAddPostToCurrentUser
); // logged in user end-point

postsRouter.put('/:id', isAuthenticated, postsController.httpUpdateUserPost);

postsRouter.delete('/:id', isAuthenticated, postsController.httpDeletePost);

export default postsRouter;
