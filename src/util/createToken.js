import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = async (
  user,
  secret = process.env.JWT_SECRET,
  expiresIn = '7d'
) => {
  const { id, email, username, role } = user;
  const token = await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  });

  return token;
};

export default createToken;
