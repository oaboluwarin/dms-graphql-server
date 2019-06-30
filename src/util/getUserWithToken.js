import jwt from 'jsonwebtoken';
import Users from '../schema/user.schema';

const getUserWithToken = async token => {
  try {
    if (token) {
      const userFromToken = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findById(userFromToken.id);
      return user;
    }
    throw new Error('No token provided');
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserWithToken;
