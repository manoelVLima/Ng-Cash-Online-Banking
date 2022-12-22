import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import LoginService from '../services/login.service';
import createToken from '../auth/jwtConfig';
import { Login } from '../types/login';

export default class LoginController {
  public service;

  constructor() {
    this.service = new LoginService();
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body as Login;

    const result = await this.service.login({ username, password }); 

    if (!result || !bcrypt.compareSync(password, result?.password)) {
      return res.status(404).json({ message: 'Username or Password invalids' });
    } 

    const token = createToken(result);

    return res.status(200).json({ token });
  }
}