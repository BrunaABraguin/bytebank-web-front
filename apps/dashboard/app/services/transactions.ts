import { createHttpService } from "@workspace/utils/http";
import { Transaction } from "@workspace/types/transaction";
import { API_URL } from "@/contants";

export const getTransactions = async (
  ownerEmail: string | null
): Promise<Transaction[]> => {
  const client = createHttpService(API_URL);

  const response = await client.get(`/api/transactions?email=${ownerEmail}`);
  return response.data;
};
