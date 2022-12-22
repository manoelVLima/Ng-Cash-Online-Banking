import prisma from '../../prisma/client';
import { User } from '../types/user';

export default class UserModel {
  public prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async create(user: User): Promise<User> {
    const [result] = await prisma.$transaction([
      this.prisma.account.create({
        data: {
          balance: 100,
          User: {
            create: {
              username: user.username,
              password: user.password,
            },
          },
        },
      }).User(),
    ]);
    return result;
  }
} 