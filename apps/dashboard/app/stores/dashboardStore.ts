import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@workspace/types/transaction";
import { create } from "zustand";

interface Transaction {
  type: TransactionEnum;
  value: number;
}

interface DashboardStore {
  balance: number;
  income: number;
  expenses: number;
  transactions: TransactionType[];
  month: number;
  year: number;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
  setBalance: (balance: number) => void;
  setIncome: (income: number) => void;
  setExpenses: (expenses: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: [],
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),

  addTransaction: (transaction: Transaction) =>
    set((state) => {
      const newTransaction: TransactionType = {
        ...transaction,
        date: new Date().toISOString(),
      };
      
      const updatedIncome =
        transaction.type === TransactionEnum.INCOME
          ? state.income + transaction.value
          : state.income;
      const updatedExpenses =
        transaction.type === TransactionEnum.EXPENSE
          ? state.expenses + transaction.value
          : state.expenses;

      const updatedBalance = updatedIncome - updatedExpenses;

      return {
        transactions: [...state.transactions, newTransaction],
        income: updatedIncome,
        expenses: updatedExpenses,
        balance: updatedBalance,
      };
    }),

  removeTransaction: (transaction: Transaction) =>
    set((state) => {
      const transactionIndex = state.transactions.findIndex(
        (t) => t.type === transaction.type && t.value === transaction.value
      );

      if (transactionIndex === -1) return state;

      const newTransactions = [...state.transactions];
      const [removedTransaction] = newTransactions.splice(transactionIndex, 1);

      const updatedIncome =
        removedTransaction?.type === TransactionEnum.INCOME
          ? state.income - removedTransaction.value
          : state.income;
      const updatedExpenses =
        removedTransaction?.type === TransactionEnum.EXPENSE
          ? state.expenses - removedTransaction.value
          : state.expenses;

      const updatedBalance = updatedIncome - updatedExpenses;

      return {
        transactions: newTransactions,
        income: updatedIncome,
        expenses: updatedExpenses,
        balance: updatedBalance,
      };
    }),

  clearTransactions: () =>
    set(() => ({
      balance: 0,
      income: 0,
      expenses: 0,
      transactions: [],
    })),

  setBalance: (balance: number) => set(() => ({ balance })),
  setIncome: (income: number) => set(() => ({ income })),
  setExpenses: (expenses: number) => set(() => ({ expenses })),
  setMonth: (month: number) => set(() => ({ month })),
  setYear: (year: number) => set(() => ({ year })),
}));
