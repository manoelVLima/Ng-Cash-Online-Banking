/* eslint-disable max-lines-per-function */
import prisma from '../../prisma/client';
import { Account } from '../types/account';
import { Login } from '../types/login';
import { Transaction } from '../types/transaction';
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

  public async getUserAccount(id: number): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({ where: { id }, 
      include: { User: { select: { username: true } } } });
    
    return account; 
  }

  public async newTransaction({ id, username, value }: Transaction) {
    try {
      return await this.prisma.$transaction(async () => {
        const senderAccount = await this.prisma.account.findUnique({ where: { id } });
        const receiverAccount = await this.prisma.user.findUnique({ where: { 
          username } }).Account();

        if (!senderAccount || !receiverAccount) {
          throw new Error('Invalid sender or receiver account');
        }

        const transaction = await this.prisma.transaction.create({
          data: {
            debitedAccountId: senderAccount.id,
            creditedAccountId: receiverAccount.id,
            value,
          },
        });
    
        await this.prisma.account.update({
          where: { id: senderAccount.id },
          data: { balance: { decrement: value } },
        });

        await this.prisma.account.update({
          where: { id: receiverAccount.id },
          data: { balance: { increment: value } },
        });

        return transaction;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
} 