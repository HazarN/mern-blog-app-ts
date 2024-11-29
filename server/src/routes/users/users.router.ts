import express, { Router } from 'express';

import usersController from './users.controller';
import {
  isAuthenticated,
  restrict,
  allowSelfOrAdmin,
} from '../../auth/auth.middleware';

const usersRouter: Router = express.Router();

usersRouter.get('/', isAuthenticated, restrict, usersController.httpGetUsers);
usersRouter.get('/post/:postId', usersController.httpGetUserByPostId);
usersRouter.get(
  '/:id',
  isAuthenticated,
  allowSelfOrAdmin,
  usersController.httpGetUserById
);

usersRouter.put(
  '/:id',
  isAuthenticated,
  allowSelfOrAdmin,
  usersController.httpUpdateUser
);

usersRouter.delete(
  '/:id',
  isAuthenticated,
  allowSelfOrAdmin,
  usersController.httpDeleteUser
);

export default usersRouter;
