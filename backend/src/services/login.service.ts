import LoginModel from '../models/login.model';
import { Login } from '../types/login';
import { User } from '../types/user';

export default class LoginService {
  public model;

  constructor() {
    this.model = new LoginModel();
  }

  public async login({ username, password }: Login):Promise<User | null> {
    const user = await this.model.login({ username, password });
    return user;
  }
}