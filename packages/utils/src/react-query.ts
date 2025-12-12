import { QueryClient } from "@tanstack/react-query";

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
}
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: (failureCount: number, error: ErrorWithResponse) => {
        const status = error?.response?.status;
        if (status && status >= 400 && status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
};

let client: QueryClient | undefined;

export const getQueryClient = (): QueryClient => {
  if (!client) {
    client = new QueryClient(queryClientConfig);
  }
  return client;
};

export const queryClient = getQueryClient();

export const resetQueryClient = (): void => {
  client?.clear();
  client = undefined;
};
export const CACHE_KEYS = {
  auth: {
    user: ["auth", "user"] as const,
    login: (email: string) => ["auth", "login", email] as const,
    register: ["auth", "register"] as const,
  },
  transactions: {
    all: ["transactions"] as const,
    list: (filters: Record<string, unknown>) =>
      ["transactions", "list", filters] as const,
    monthly: (month: number, year: number) =>
      ["transactions", "monthly", month, year] as const,
    byCategory: (category: string) =>
      ["transactions", "category", category] as const,
    create: ["transactions", "create"] as const,
    update: (id: string) => ["transactions", "update", id] as const,
    delete: (id: string) => ["transactions", "delete", id] as const,
  },
  categories: {
    all: ["categories"] as const,
    data: (month: number, year: number) =>
      ["categories", "data", month, year] as const,
  },
  account: {
    balance: (email: string, month: number, year: number) =>
      ["account", "balance", email, month, year] as const,
  },
  upload: {
    files: ["upload", "files"] as const,
    process: (filename: string) => ["upload", "process", filename] as const,
  },
} as const;
