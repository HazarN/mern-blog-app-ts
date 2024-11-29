import { Response, NextFunction } from 'express';
import { IRequest } from 'types/express';

import jwtUtils from '../utils/jwt';
import Exceptions from '../utils/Exceptions';

import IUserPayload from './IUserPayload';

// Check if the user is authenticated
function isAuthenticated(req: IRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return Exceptions.unauthorized(res, 'You are not authenticated');

  const token = authHeader.split(' ')[1]; // Bearer <token>
  const isVerified = jwtUtils.verifyAccessToken(token, req, res);

  if (!isVerified) return Exceptions.forbidden(res, 'Invalid or expired token');
  else next();
}

// Only an admin can reach the restricted routes
function restrict(req: IRequest, res: Response, next: NextFunction): void {
  const userPayload: IUserPayload | undefined = req.userPayload;

  if (!userPayload || !userPayload.isAdmin)
    return Exceptions.unauthorized(res, 'You are not authenticated');

  next();
}

// A user can reach his own data or an admin can reach any user's data
function allowSelfOrAdmin(
  req: IRequest<{ id: string }>,
  res: Response,
  next: NextFunction
): void {
  const userPayload: IUserPayload | undefined = req.userPayload;
  const userId = Number(req.params.id);

  if (!userPayload || (userPayload.id !== userId && !userPayload.isAdmin))
    return Exceptions.unauthorized(res, 'You are not authenticated');

  next();
}

export { isAuthenticated, restrict, allowSelfOrAdmin };
