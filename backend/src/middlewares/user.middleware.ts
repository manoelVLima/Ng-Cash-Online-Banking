import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { User } from '../types/user';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).regex(/(?=.*?[A-Z])(?=.*?[0-9])/).required()
    .messages({
      'string.pattern.base': 'Fields invalids',
    }),
}).required();

const validation = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  const { error } = userSchema.validate(user);
  
  if (error) return res.status(400).json({ message: error.message });

  return next();
};
export default validation;