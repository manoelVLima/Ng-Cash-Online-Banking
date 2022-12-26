import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { Account } from '../types/account';
import { Login } from '../types/login';
import { Transaction } from '../types/transaction';
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

  public async getUserAccount(id: number): Promise<Account | null> {
    const account = await this.model.getUserAccount(id);
    return account;
  }

  public async newTransaction({ id, username, value }: Transaction) {
    const transaction = await this.model.newTransaction({ id, username, value });
    return transaction;
  }
}