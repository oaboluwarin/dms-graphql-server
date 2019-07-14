import jwt from 'jsonwebtoken';
import Users from '../models/user';
import { AuthenticationError } from 'apollo-server-express';

const getUserWithToken = async req => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const userFromToken = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findById(userFromToken.id);
      return user;
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

export default getUserWithToken;
