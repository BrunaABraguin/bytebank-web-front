import { create } from "zustand";
interface AccountStore {
  accountId: string;
  setAccountId: (accountId: string) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accountId: "",
  setAccountId: (accountId: string) => set(() => ({ accountId })),
}));
