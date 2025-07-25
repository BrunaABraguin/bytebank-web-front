import { create } from "zustand";

interface DashboardStore {
  balance: number;
  income: number;
  expenses: number;
  month: number;
  year: number;
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
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  setBalance: (balance: number) => set(() => ({ balance })),
  setIncome: (income: number) => set(() => ({ income })),
  setExpenses: (expenses: number) => set(() => ({ expenses })),
  setMonth: (month: number) => set(() => ({ month })),
  setYear: (year: number) => set(() => ({ year })),
}));
