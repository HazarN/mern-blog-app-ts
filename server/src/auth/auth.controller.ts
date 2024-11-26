import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import Exceptions from '../utils/Exceptions';
import hashUtils from '../utils/hash';
import jwtUtils from '../utils/jwt';
import usersModel from '../models/users/users.model';
import IUserPayload from './IUserPayload';

interface IUserCredentials {
  email: string;
  password: string;
}

// POST /login
async function httpLogin(
  req: Request<{}, {}, IUserCredentials>,
  res: Response
) {
  const { email, password } = req.body;

  // break the function if email or password is missing
  if (!email || !password)
    return Exceptions.badRequest(res, 'Email and password are required');

  try {
    const user = await usersModel.getUserByEmail(email, true);

    // break the function if there is no user with the given email
    if (!user) return Exceptions.unauthorized(res, 'Invalid email or password');

    // validate the password
    const isValidPassword = await hashUtils.comparePassword(
      password,
      user.password
    );

    // break the function if the password is invalid, if not, generate an access token and send it to the client
    if (!isValidPassword) {
      return Exceptions.unauthorized(res, 'Invalid email or password');
    } else {
      const accessToken = jwtUtils.generateAccessToken(user);
      const refreshToken = jwtUtils.generateRefreshToken(user);

      // save the refresh token to the user document in order to use it later
      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({
        message: 'Login successful',
        payload: {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

// POST /logout
async function httpLogout(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return Exceptions.badRequest(res, 'Refresh token is required');

  try {
    const user = await usersModel.getUserByRefreshToken(refreshToken, true);

    if (!user) return Exceptions.notFound(res, 'User not found');

    // if the user is found, remove the refresh token from the user document

    user.refreshToken = null;
    await user.save();

    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Failed to logout, Check the terminal for more information',
      err
    );
  }
}

// POST /refresh
async function httpRefreshToken(
  req: Request<{}, {}, { refreshToken: string }>,
  res: Response
) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken)
    return Exceptions.badRequest(
      res,
      'Refresh token is required for the request body'
    );

  try {
    const payload: IUserPayload | null = jwtUtils.verifyRefreshToken(
      refreshToken,
      req,
      res
    );

    if (!payload) return Exceptions.forbidden(res, 'Invalid or expired token');

    const user = await usersModel.getUserById(payload.id, true);

    if (!user || user.refreshToken !== refreshToken)
      return Exceptions.notFound(res, 'User not found');

    // if the user is found and the refresh token is valid, generate a new access token and send it to the client

    const accessToken = jwtUtils.generateAccessToken(user);
    const newRefreshToken = jwtUtils.generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: 'Token refreshed successfully',
      payload: {
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (err) {
    return Exceptions.internal(
      res,
      'Check the terminal for more information',
      err
    );
  }
}

export default {
  httpLogin,
  httpLogout,
  httpRefreshToken,
};
