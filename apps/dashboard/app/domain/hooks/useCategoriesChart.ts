import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "@/domain/services/categories";
import { CategoryData } from "@bytebank-web/types/categoryData";


export const useCategoriesChart = (
  ownerEmail: string | null,
  month: number,
  year: number
) => {
  const { data, isLoading, error } = useQuery<CategoryData[], Error>({
    queryKey: ["categories-chart", ownerEmail, month, year],
    queryFn: () => getCategoriesData(ownerEmail, month, year),
    enabled: !!ownerEmail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, isLoading, error };
};
