import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { Login } from '../types/login';
import { User } from '../types/user';

export default class UserService {
  public model;

  constructor() {
    this.model = new UserModel();
  }

  public async signUp({ username, password }: User):Promise<User | null> {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const balance = 100;

    const result = await this.model.signUp({ username, password: passwordHash, balance });
    return result;
  }

  public async signIn({ username, password }: Login):Promise<User | null> {
    const user = await this.model.signIn({ username, password });
    return user;
  }
}