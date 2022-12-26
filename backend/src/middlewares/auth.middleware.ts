import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validateToken } from '../auth/jwtConfig';

const auth = (req:Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found!' });

  const result = validateToken(token) as JwtPayload;

  if (result.isError) return res.status(401).json({ message: result.message });

  req.user = result;
  return next();
};
export default auth;