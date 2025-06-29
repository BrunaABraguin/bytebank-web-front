export declare enum TransactionEnum {
    INCOME = "income",
    EXPENSE = "expense",
    TRANSFER = "transfer"
}
export type Transaction = {
    _id: string;
    date: Date;
    type: TransactionEnum;
    amount: number;
    accountId: string;
};
