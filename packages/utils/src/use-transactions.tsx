import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@bytebank-web/types/transaction";
import { getTransactions } from "./get-transactions.js";

export const useTransactions = (
  ownerEmail: string | null,
  page: number,
  pageSize: number,
  type: string | undefined
) => {
  const { data, isLoading, error } = useQuery<
    { transactions: Transaction[]; totalPages: number; hasMore: boolean },
    Error
  >({
    queryKey: ["transactions", ownerEmail, page, pageSize, type],
    queryFn: () => getTransactions(ownerEmail, page, pageSize, type),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    transactions: data?.transactions || [],
    totalPages: data?.totalPages || 0,
    hasMore: data?.hasMore || false,
    isLoading,
    error,
  };
};
