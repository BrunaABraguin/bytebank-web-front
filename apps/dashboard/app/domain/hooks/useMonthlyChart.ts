import { getMonthlyData } from "@/domain/services/monthly-chart";
import { useQuery } from "@tanstack/react-query";
import { MonthlyData } from "@bytebank-web/types/monthlyData";


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
