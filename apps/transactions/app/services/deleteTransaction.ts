import { createHttpService } from "@bytebank-web/utils/http";
import { Transaction } from "@bytebank-web/types/transaction";
import { API_URL } from "@/constants";

export const deleteTransaction = async (
  transactionId: Transaction["_id"]
): Promise<{ message: string }> => {
  const client = createHttpService(API_URL);

  const response = await client.delete("api/transactions", {
    params: { id: transactionId },
  });

  return response.data;
};
