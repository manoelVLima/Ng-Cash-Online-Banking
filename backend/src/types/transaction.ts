import { Decimal } from '@prisma/client/runtime';

export interface Transaction {
  username: string;
  id: number;
  value: Decimal;
}