import express, { Router } from 'express';

import usersController from './users.controller';
import {
  isAuthenticated,
  restrict,
  allowSelfOrAdmin,
} from '../../auth/auth.middleware';

const usersRouter: Router = express.Router();

usersRouter.get('/', isAuthenticated, restrict, usersController.httpGetUsers);
usersRouter.get(
  '/:id',
  isAuthenticated,
  allowSelfOrAdmin,
  usersController.httpGetUserById
);

// FIXME: it is a better approach to use this function in the auth.controller.ts as a registry endpoint
usersRouter.post('/', isAuthenticated, usersController.httpAddUser);

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
