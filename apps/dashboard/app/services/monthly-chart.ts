import { createHttpService } from "@workspace/utils/http";
import { MonthlyData } from "@workspace/types/monthlyData";

export const getMonthlyData = async (
  ownerEmail: string | null
): Promise<MonthlyData[]> => {
  const client = createHttpService();

  const response = await client.get(`/api/monthly-data?email=${ownerEmail}`);
  return response.data;
};
