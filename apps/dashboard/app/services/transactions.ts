import { createHttpService } from "@workspace/utils/http";
import { API_URL } from "../../../shell/contants";
import { Transaction } from "@workspace/types/transaction";

export const getTransactions = async (
  ownerEmail: string | null
): Promise<Transaction[]> => {
  const client = createHttpService(API_URL as string);

  const response = await client.get(`/api/transactions?email=${ownerEmail}`);
  return response.data;
};
