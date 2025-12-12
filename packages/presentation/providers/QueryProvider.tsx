"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "@bytebank-web/utils/react-query";
import { QueryClient } from "@tanstack/react-query";

interface QueryProviderProps {
  readonly children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = new QueryClient(queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {typeof globalThis !== "undefined" &&
        globalThis.process?.env?.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
    </QueryClientProvider>
  );
}
