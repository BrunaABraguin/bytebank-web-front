import { getBalanceAccount } from "@/services/balance";
import { useQuery } from "@tanstack/react-query";
import { Account } from "@bytebank-web/types/account";

/**
 * Hook para buscar transações com base no email do proprietário.
 * @param ownerEmail O email do proprietário das transações.
 * @returns {object} Dados das transações, estado de carregamento e erros.
 */
export const useBalance = (ownerEmail: string | null) => {
  const {
    data: account,
    isLoading: isLoadingAccount,
    error,
  } = useQuery<Account, Error>({
    queryKey: ["balance"],
    queryFn: () => getBalanceAccount(ownerEmail),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { account, isLoadingAccount, error };
};
