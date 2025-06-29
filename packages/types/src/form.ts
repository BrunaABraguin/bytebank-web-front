import { TransactionEnum } from "../transaction";

export type FormValues = {
  type: TransactionEnum;
  amount: string;
  accountId: string;
};
