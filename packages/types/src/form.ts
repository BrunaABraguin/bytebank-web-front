import { TransactionEnum } from "./transaction.js";

export type FormValues = {
  type: TransactionEnum;
  value: string;
  accountId: string;
};
