import UserModel from '../models/user.model';
import { User } from '../types/user';

export default class UserService {
  public model;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: User):Promise<User> {
    const result = await this.model.create(user);
    return result;
  }
}