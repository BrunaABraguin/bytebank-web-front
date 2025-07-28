import { createHttpService } from "@workspace/utils/http";
import { Transaction } from "@workspace/types/transaction";

export const getTransactions = async (
  ownerEmail: string | null
): Promise<Transaction[]> => {
  const client = createHttpService();

  const response = await client.get(`/api/transactions?email=${ownerEmail}`);
  return response.data;
};
