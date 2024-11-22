import { Response, NextFunction } from 'express';

import { IRequest } from 'types/express';
import Exceptions from '../utils/Exceptions';
import jwtUtils from '../utils/jwt';

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
  const user = req.user;

  if (!user || !user.isAdmin)
    return Exceptions.unauthorized(res, 'You are not authenticated');

  next();
}

// A user can reach his own data or an admin can reach any user's data
function allowSelfOrAdmin(
  req: IRequest<{ id: string }>,
  res: Response,
  next: NextFunction
): void {
  const user = req.user;
  const userId = Number(req.params.id);

  if (!user || (user.id !== userId && !user.isAdmin))
    return Exceptions.unauthorized(res, 'You are not authenticated');

  next();
}

export { isAuthenticated, restrict, allowSelfOrAdmin };
