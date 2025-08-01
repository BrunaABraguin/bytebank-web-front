import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "./contants.js";
import { Transaction } from "@bytebank-web/types/transaction";

export const getTransactions = async (
  ownerEmail: string | null,
  page: number,
  pageSize: number
): Promise<{ transactions: Transaction[]; totalPages: number; hasMore: boolean }> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/transactions", {
    params: { email: ownerEmail, page, pageSize },
  });
  return response.data;
};
