import prisma from '../../prisma/client';
import { Login } from '../types/login';
import { User } from '../types/user';

export default class LoginModel {
  public prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async login({ username }: Login):Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    return user;
  }
}