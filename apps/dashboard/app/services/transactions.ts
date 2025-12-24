import { createHttpService } from "@bytebank-web/utils";
import { Transaction } from "@bytebank-web/types/transaction";
import { API_URL } from "@/constants";

export const getTransactions = async (
  ownerEmail: string | null
): Promise<Transaction[]> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/transactions", {
    params: { email: ownerEmail },
  });
  return response.data;
};
