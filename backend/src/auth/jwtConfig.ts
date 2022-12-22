import jwt, { Secret } from 'jsonwebtoken';
import { Token } from '../types/token';

const secret: Secret = process.env.JWT_SECRET || 'segredo';

const createToken = ({ accountId, id, username }: Token) => {
  const payload = { accountId, id, username };
  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};
export default createToken;
