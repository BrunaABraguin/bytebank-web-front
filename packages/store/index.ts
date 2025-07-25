import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SharedStore {
  email: string | null;
  setEmail: (email: string) => void;
}

export const useSharedStore = create(
  persist<SharedStore>(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
    }),
    {
      name: "shared-store",
    }
  )
);
