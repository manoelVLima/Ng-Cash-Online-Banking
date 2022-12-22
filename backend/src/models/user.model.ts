import prisma from '../../prisma/client';
import { User } from '../types/user';

export default class UserModel {
  public prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async create({ password, username }: User): Promise<User> {
    const [result] = await prisma.$transaction([
      this.prisma.account.create({
        data: {
          balance: 100,
          User: {
            create: {
              username,
              password,
            },
          },
        },
      }).User(),
    ]);
    return result;
  }
} 