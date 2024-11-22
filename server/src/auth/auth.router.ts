import express, { Router } from 'express';

import { isAuthenticated } from './auth.middleware';
import authController from './auth.controller';

const authRouter: Router = express.Router();

authRouter.post('/login', authController.httpLogin);
authRouter.post('/refresh', authController.httpRefreshToken);

// logout is a protected route
authRouter.post('/logout', isAuthenticated, authController.httpLogout);

export default authRouter;
