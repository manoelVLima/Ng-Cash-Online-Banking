import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../types/user';

const secret: Secret = process.env.JWT_SECRET || 'segredo';

const createToken = ({ accountId, id, username }: User) => {
  const payload = { accountId, id, username };
  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};
export default createToken;
