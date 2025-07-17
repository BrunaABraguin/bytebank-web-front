import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@workspace/types/transaction";

export interface TransactionsState {
  data: TransactionType[];
}

const initialState: TransactionsState = {
  data: [],
};

interface AddTransactionPayload {
  type: TransactionEnum;
  value: number;
  [key: string]: unknown;
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<AddTransactionPayload>) => {
      const { type, value } = action.payload;
      let adjustedValue = Math.abs(value);

      if (type === "expense" || type === "transfer") {
        adjustedValue = -Math.abs(value);
      }

      state.data.push({
        ...action.payload,
        value: adjustedValue,
        date: new Date().toISOString(),
        _id: crypto.randomUUID(),
        accountId: "default-account",
      });
    },
  },
});

export const selectTransactions = createSelector(
  (state: { transactions: TransactionsState }) => state.transactions.data,
  (transactions) =>
    transactions.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }))
);

export const selectCurrentBalance = createSelector(
  [selectTransactions],
  (transactions: ReturnType<typeof selectTransactions>) =>
    transactions.reduce(
      (balance, transaction) => balance + transaction.value,
      0
    )
);

export const selectIncome = (month: number, year: number) =>
  createSelector(
    [selectTransactions],
    (transactions: ReturnType<typeof selectTransactions>) =>
      transactions
        .filter(
          (transaction) =>
            transaction.type === "income" &&
            transaction.date.getMonth() + 1 === month &&
            transaction.date.getFullYear() === year
        )
        .reduce((total, transaction) => total + transaction.value, 0)
  );

export const selectExpenses = (month: number, year: number) =>
  createSelector(
    [selectTransactions],
    (transactions: ReturnType<typeof selectTransactions>) =>
      transactions
        .filter(
          (transaction) =>
            transaction.type === "expense" &&
            transaction.date.getMonth() + 1 === month &&
            transaction.date.getFullYear() === year
        )
        .reduce((total, transaction) => total + transaction.value, 0)
  );

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
