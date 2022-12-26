export interface User {
  id?: number;
  username: string;
  password: string;
  accountId?: number;
}

export interface CreateUser {
  id?: number;
  username: string;
  password: string;
  balance: number;
  accountId?: number;
}