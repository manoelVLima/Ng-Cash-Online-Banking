import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import { User } from '../types/user';
import createToken from '../auth/jwtConfig';

export default class LoginController {
  public service;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req: Request, res: Response) {
    const user = req.body as User;

    const result = await this.service.login(user); 
    
    if (!result) {
      return res.status(404).json({ message: 'Username or Password invalids' });
    } 

    const token = createToken(result);

    return res.status(200).json({ token });
  }
}