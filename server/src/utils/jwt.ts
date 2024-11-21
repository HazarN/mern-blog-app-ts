import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';

import { IRequest } from '../../types/express';

import displayMessage from './display';
import IUser from '../models/users/IUser';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_ACCESS_SECRET) {
  throw new Error(displayMessage('JWT_ACCESS_SECRET is not defined', '*'));
}

function generateAccessToken(user: IUser) {
  const payload = { id: user.id, isAdmin: user.isAdmin };

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '15m',
  });

  return accessToken;
}

function verifyAccessToken(
  token: string,
  req: IRequest<{}, {}, IUser>,
  res: Response
): boolean {
  let isVerified: boolean = false;

  jwt.verify(token, JWT_ACCESS_SECRET as string, (err, user) => {
    if (err) return isVerified;

    req.user = user as IUser;
    isVerified = true;
  });

  return isVerified;
}

export default {
  generateAccessToken,
  verifyAccessToken,
};
