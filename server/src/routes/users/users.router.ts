import express, { Router } from 'express';

import usersController from './users.controller';
import isAuthenticated from '../../auth/auth.middleware';

const usersRouter: Router = express.Router();

usersRouter.get('/', isAuthenticated, usersController.httpGetUsers);
usersRouter.get('/:id', isAuthenticated, usersController.httpGetUserById);

usersRouter.post('/', isAuthenticated, usersController.httpAddUser);

usersRouter.put('/:id', isAuthenticated, usersController.httpUpdateUser);

usersRouter.delete('/:id', isAuthenticated, usersController.httpDeleteUser);

export default usersRouter;
