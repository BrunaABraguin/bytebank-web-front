import { TransactionEnum } from "./transaction.js";

export type FormValues = {
  type: TransactionEnum;
  amount: string;
  accountId: string;
};
