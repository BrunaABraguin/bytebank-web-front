export enum TransactionEnum {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer",
}

export type Transaction = {
  _id: string;
  date: string;
  type: TransactionEnum;
  value: number;
  accountId: string;
};
