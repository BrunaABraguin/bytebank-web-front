import { createHttpService } from "@workspace/utils/http";
import { API_URL } from "../../../shell/contants";
import { MonthlyData } from "@workspace/types/monthlyData";

export const getMonthlyData = async (
  ownerEmail: string
): Promise<MonthlyData[]> => {
  const client = createHttpService(API_URL as string);

  const response = await client.get(`/api/monthly-data?email=${ownerEmail}`);
  return response.data;
};
