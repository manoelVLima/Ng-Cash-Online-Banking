import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { User } from '../types/user';

export default class UserService {
  public model;

  constructor() {
    this.model = new UserModel();
  }

  public async create({ username, password }: User):Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
 
    const result = await this.model.create({ username, password: passwordHash });
    return result;
  }
}