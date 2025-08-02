import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "@/services/categories";
import { CategoryData } from "@bytebank-web/types/categoryData";

/**
 * Hook para buscar dados para o grafico de transações com base no email do proprietário.
 * @param ownerEmail O email do proprietário das transações.
 * @returns {object} Dados das transações, estado de carregamento e erros.
 */
export const useCategoriesChart = (ownerEmail: string | null, month: number, year: number) => {
  const { data, isLoading, error } = useQuery<CategoryData[], Error>({
    queryKey: ["categories-chart", ownerEmail, month, year],
    queryFn: () => getCategoriesData(ownerEmail, month, year),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, isLoading, error };
};
