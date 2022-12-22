import prisma from '../../prisma/client';
import { User } from '../types/user';

export default class LoginModel {
  public prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async login({ username, password }: User):Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: {
        AND: {
          password,
          username,
        },
      },
    });
    return user;
  }
}