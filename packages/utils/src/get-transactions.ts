import { createHttpService } from "@workspace/utils/http";
import { Transaction } from "@workspace/types/transaction";
import { API_URL } from "./contants.js";

export const getTransactions = async (
  ownerEmail: string | null,
  page: number,
  pageSize: number
): Promise<{ transactions: Transaction[]; totalPages: number }> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/transactions", {
    params: { email: ownerEmail, page, pageSize },
  });
  return response.data;
};
