import { createHttpService } from "@workspace/utils/http";
import { MonthlyData } from "@workspace/types/monthlyData";
import { API_URL } from "@/contants";

export const getMonthlyData = async (
  ownerEmail: string | null
): Promise<MonthlyData[]> => {
  const client = createHttpService(API_URL);

  const response = await client.get(`/api/monthly-data?email=${ownerEmail}`);
  return response.data;
};
