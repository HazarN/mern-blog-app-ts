import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';

import { IRequest } from '../../types/express';

import displayMessage from './display';
import IUser from '../models/users/IUser';
import IUserPayload from 'src/auth/IUserPayload';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error(displayMessage('One of the JWT secrets are not found', '*'));
}

function generateAccessToken(user: IUser) {
  const payload: IUserPayload = { id: user.id, isAdmin: user.isAdmin };

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '15m',
  });

  return accessToken;
}

function generateRefreshToken(user: IUser) {
  const payload: IUserPayload = { id: user.id, isAdmin: user.isAdmin };

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: '7d',
  });

  return refreshToken;
}

function verifyAccessToken(
  token: string,
  req: IRequest<{}, {}, IUserPayload>,
  res: Response
): boolean {
  try {
    const payload = jwt.verify(
      token,
      JWT_ACCESS_SECRET as string
    ) as IUserPayload;

    req.userPayload = payload;

    return true;
  } catch (err) {
    return false;
  }
}

function verifyRefreshToken(token: string, req: IRequest, res: Response) {
  try {
    const payload = jwt.verify(
      token,
      JWT_REFRESH_SECRET as string
    ) as IUserPayload;

    return payload;
  } catch (err) {
    return null;
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
