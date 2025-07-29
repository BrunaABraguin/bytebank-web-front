import { createHttpService } from "@workspace/utils/http";
import { Transaction } from "@workspace/types/transaction";
import { API_URL } from "@/contants";

export const patchTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
    const client = createHttpService(API_URL);

  const response = await client.patch("api/transactions", {
    id: transaction._id,
    type: transaction.type,
    value: transaction.value,
    description: transaction.description,
    category: transaction.category,
  });
  return response.data;
};
