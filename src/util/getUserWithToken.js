import jwt from 'jsonwebtoken';
import Users from '../schema/user.schema';

const getUserWithToken = async token => {
  const userFromToken = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await Users.findById(userFromToken.id);
  return user;
};

export default getUserWithToken;
