export enum TransactionEnum {
  INCOME = "Receita",
  EXPENSE = "Despesa",
  TRANSFER = "Transferência",
}

export type Transaction = {
  _id?: string;
  date: string;
  type: TransactionEnum;
  value: number;
  accountId?: string;
};
