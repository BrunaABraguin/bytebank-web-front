import { createHttpService } from "@workspace/utils/http";
import { Transaction } from "@workspace/types/transaction";
import { API_URL } from "@/contants";

export const deleteTransaction = async (
  transactionId: Transaction["_id"]
): Promise<{ message: string }> => {
  const client = createHttpService(API_URL);

  const response = await client.delete("api/transactions", {
    params: { id: transactionId },
  });

  return response.data;
};
