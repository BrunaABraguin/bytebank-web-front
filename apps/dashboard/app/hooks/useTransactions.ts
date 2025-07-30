import { getTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@bytebank-web/types/transaction";

/**
 * Hook para buscar transações com base no email do proprietário.
 * @param ownerEmail O email do proprietário das transações.
 * @returns {object} Dados das transações, estado de carregamento e erros.
 */
export const useTransactions = (ownerEmail: string | null) => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<Transaction[], Error>({
    queryKey: ["transactions", ownerEmail],
    queryFn: () => getTransactions(ownerEmail),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { transactions, isLoading, error };
};
