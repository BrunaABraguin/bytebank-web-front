"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@workspace/utils/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
