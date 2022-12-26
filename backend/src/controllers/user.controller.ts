import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import { User } from '../types/user';
import { Login } from '../types/login';
import createToken from '../auth/jwtConfig';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public async signUp(req: Request, res: Response):Promise<Response> {
    const { password, username }: User = req.body;
    const result = await this.service.signUp({ password, username });

    if (!result) return res.status(404).json({ message: 'Something went wrong' });
    return res.status(201).json(result);
  }

  public async signIn(req: Request, res: Response) {
    const { username, password } = req.body as Login;

    const result = await this.service.signIn({ username, password }); 
    const id = result?.accountId;
  
    if (!result || !bcrypt.compareSync(password, result?.password)) {
      return res.status(404).json({ message: 'Username or Password invalids' });
    } 

    const token = createToken(result);

    return res.status(200).json({ id, token });
  }
}