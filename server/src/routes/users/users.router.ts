import express, { Router } from 'express';

import usersController from './users.controller';

const router: Router = express.Router();

router.get('/', usersController.httpGetUsers);
router.get('/:id', usersController.httpGetUserById);

router.post('/', usersController.httpAddUser);

router.put('/:id', usersController.httpUpdateUser);

router.delete('/:id', usersController.httpDeleteUser);

export default router;
