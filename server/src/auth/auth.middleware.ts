import { Request, Response, NextFunction } from 'express';

import Exceptions from '../utils/Exceptions';
import jwtUtils from '../utils/jwt';

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return Exceptions.unauthorized(res, 'You are not authenticated');

  const token = authHeader.split(' ')[1]; // Bearer <token>

  const isVerified = jwtUtils.verifyAccessToken(token, req, res);

  if (!isVerified) return Exceptions.forbidden(res, 'Invalid or expired token');
  else next();
}

export default isAuthenticated;

// Basic Authorization rules:
/*

Every endpoint should be protected for the non-authenticated users except for the /login and /register endpoints.

A user should be able to access their own data and manipulate it, but not the data of other users.

An admin should be able to access all the data.

*/
