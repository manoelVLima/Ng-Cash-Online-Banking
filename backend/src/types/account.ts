import { Decimal } from '@prisma/client/runtime';

export interface Account {
  id: number;
  balance: Decimal;
  User: { username: string; } | null;
}