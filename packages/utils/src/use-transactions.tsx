import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@workspace/types/transaction";
import { getTransactions } from "./get-transactions.js";


export const useTransactions = (ownerEmail: string | null) => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(ownerEmail),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { transactions, isLoading, error };
};
