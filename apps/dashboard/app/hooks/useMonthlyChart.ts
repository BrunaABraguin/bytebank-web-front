import { getMonthlyData } from "@/services/monthly-chart";
import { useQuery } from "@tanstack/react-query";
import { MonthlyData } from "@bytebank-web/types/monthlyData";

/**
 * Hook para buscar dados para o grafico de transações com base no email do proprietário.
 * @param ownerEmail O email do proprietário das transações.
 * @returns {object} Dados das transações, estado de carregamento e erros.
 */
export const useMonthlyChart = (ownerEmail: string | null) => {
  const { data, isLoading, error } = useQuery<MonthlyData[], Error>({
    queryKey: ["monthly-chart"],
    queryFn: () => getMonthlyData(ownerEmail),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, isLoading, error };
};
