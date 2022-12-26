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

  public async getUserAccount(id: number): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({ where: { id }, 
      include: { User: { select: { username: true } } } });
    
    return account; 
  }

  public async newTransaction({ id, username, value }: Transaction) {
    const senderAccount = await this.prisma.account.findUnique({ where: { id } });
    const receiverAccount = await this.prisma.user.findUnique({ where: { username } }).Account();
    
    const newTransaction = await this.prisma.transaction.create({
      data: {
        debitedAccountId: Number(senderAccount?.id),
        creditedAccountId: Number(receiverAccount?.id),
        value,
      },
    });
    // atualiza a conta de quem enviou
    await this.prisma.account.update({
      where: { id: Number(senderAccount?.id) },
      data: { balance: Number(senderAccount?.balance) - Number(value) },
    });
    // atualiza a conta de quem recebeu
    await this.prisma.account.update({
      where: { id: Number(receiverAccount?.id) },
      data: { balance: Number(receiverAccount?.balance) + Number(value) },
    });
    return newTransaction;
  }
} 