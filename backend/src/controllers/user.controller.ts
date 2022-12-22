import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { User } from '../types/user';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public async create(req: Request, res: Response):Promise<Response> {
    const user = req.body as User;
    const result = await this.service.create(user);
    return res.status(201).json(result);
  }
}