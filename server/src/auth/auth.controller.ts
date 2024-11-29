import { Request, Response } from 'express';

import jwtUtils from '../utils/jwt';
import hashUtils from '../utils/hash';
import Exceptions from '../utils/Exceptions';

import IUserPayload from './IUserPayload';
import IUser from '../models/users/IUser';
import usersModel from '../models/users/users.model';

enum Time {
  SEVEN_DAYS_FROM_NOW = 7 * 24 * 60 * 60 * 1000,
}
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

      console.log(`RefreshToken: ${refreshToken}`);

      // save the refresh token to the user document in order to use it later
      user.refreshToken = refreshToken;
      await user.save();

      // sending the refresh token as a secured cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: Time.SEVEN_DAYS_FROM_NOW,
        path: '/',
      });

      res.status(200).json({
        message: 'Login successful',
        payload: {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
          accessToken,
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

// POST /register
async function httpRegister(
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<void> {
  try {
    const userBody: IUser = req.body;
    const { email } = userBody as IUser;

    // to avoid duplicate users
    if (await usersModel.isUserExist(email))
      return Exceptions.conflict(res, 'User already exists');

    // null check for name, email, and password in the request body
    if (!userBody.name || !userBody.email || !userBody.password)
      return Exceptions.badRequest(res, 'Invalid request body');

    const newUser: IUser | null = await usersModel.addUser(userBody);

    res.status(201).json(newUser);
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
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return Exceptions.badRequest(res, 'Refresh token is required');

  try {
    const user = await usersModel.getUserByRefreshToken(refreshToken, true);

    if (!user) return Exceptions.notFound(res, 'User not found');

    // if the user is found, remove the refresh token from the user document
    user.refreshToken = null;
    await user.save();

    console.log(`Removed RefreshToken: ${refreshToken}`);

    // clearing the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

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

// GET /refresh
async function httpRefreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return Exceptions.badRequest(
      res,
      'Refresh token is required in the cookie'
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

    console.log(`Updated RefreshToken: ${newRefreshToken}`);

    // update the refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: Time.SEVEN_DAYS_FROM_NOW,
    });

    res.status(200).json({
      message: 'Token refreshed successfully',
      payload: {
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken,
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

// GET /auth/user
async function httpGetAuthUser(req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return Exceptions.badRequest(
      res,
      'Refresh token is required in the cookie'
    );

  try {
    const user: IUser | null = await usersModel.getUserByRefreshToken(
      refreshToken,
      true
    );

    if (!user) return Exceptions.notFound(res, 'User not found');

    // if there is a user with the given refresh token, create a new access token and send it to the client
    const accessToken = jwtUtils.generateAccessToken(user);

    res.status(200).json({
      message: 'User found',
      payload: {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken,
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
  httpRegister,
  httpLogout,
  httpRefreshToken,
  httpGetAuthUser,
};
