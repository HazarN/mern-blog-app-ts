import { Request, Response } from 'express';

import Exceptions from '../utils/Exceptions';
import hashUtils from '../utils/hash';
import jwtUtils from '../utils/jwt';
import usersModel from '../models/users/users.model';

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
    const user = await usersModel.getUserByEmail(email);

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

      res.status(200).json({
        message: 'Login successful',
        payload: {
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

export default {
  httpLogin,
};
