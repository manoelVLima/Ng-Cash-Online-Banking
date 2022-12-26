/* eslint-disable max-lines-per-function */
import prisma from '../../prisma/client';
import { Login } from '../types/login';
import { CreateUser, User } from '../types/user';

export default class UserModel {
  public prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async signUp({ password, username, balance }: CreateUser): Promise<User | null> {
    try {
      const [result] = await prisma.$transaction([
        this.prisma.account.create({
          data: {
            balance,
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
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async signIn({ username }: Login):Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    return user;
  }
} 