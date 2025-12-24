import { createHttpService } from "@bytebank-web/utils";
import { MonthlyData } from "@bytebank-web/types/monthlyData";
import { API_URL } from "@/constants";

export const getMonthlyData = async (
  ownerEmail: string | null
): Promise<MonthlyData[]> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/monthly-data", {
    params: { email: ownerEmail },
  });
  return response.data;
};
