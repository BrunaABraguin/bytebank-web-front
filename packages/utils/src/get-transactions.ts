import { createHttpService } from "@bytebank-web/utils";
import { API_URL } from "./constants.js";
import { Transaction } from "@bytebank-web/types/transaction";

export const getTransactions = async (
  ownerEmail: string | null,
  page: number,
  pageSize: number,
  type: string | undefined
): Promise<{
  transactions: Transaction[];
  totalPages: number;
  hasMore: boolean;
}> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/transactions", {
    params: { email: ownerEmail, page, pageSize, type },
  });
  return response.data;
};
