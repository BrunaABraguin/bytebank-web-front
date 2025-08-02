import { getBalanceAccount } from "@/services/balance";
import { useQuery } from "@tanstack/react-query";
import { Account } from "@bytebank-web/types/account";

/**
 * Hook para buscar transações com base no email do proprietário.
 * @param ownerEmail O email do proprietário das transações.
 * @returns {object} Dados das transações, estado de carregamento e erros.
 */
export const useBalance = (ownerEmail: string | null, month: number, year: number) => {
  const {
    data: account,
    isLoading: isLoadingAccount,
    error,
  } = useQuery<Account, Error>({
    queryKey: ["balance", ownerEmail, month, year],
    queryFn: () => getBalanceAccount(ownerEmail, month, year),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { account, isLoadingAccount, error };
};
