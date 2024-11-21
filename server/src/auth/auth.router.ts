import express, { Router } from 'express';
import authController from './auth.controller';

const authRouter: Router = express.Router();

authRouter.post('/login', authController.httpLogin);

export default authRouter;
