import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SharedStore {
  email: string | null;
  setEmail: (email: string) => void;
  name: string | null;
  setName: (name: string) => void;
}

export const useSharedStore = create(
  persist<SharedStore>(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      name: null,
      setName: (name) => set({ name }),
    }),
    {
      name: "shared-store",
    }
  )
);
