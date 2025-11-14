"use client";

import { QueryProvider } from "./QueryProvider";
import { StateProvider } from "./StateProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <StateProvider>
      <QueryProvider>{children}</QueryProvider>
    </StateProvider>
  );
}
