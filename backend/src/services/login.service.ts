import LoginModel from '../models/login.model';
import { User } from '../types/user';

export default class LoginService {
  public model;

  constructor() {
    this.model = new LoginModel();
  }

  public async login({ password, username }: User):Promise<User | null> {
    const user = await this.model.login({ password, username });
    return user;
  }
}