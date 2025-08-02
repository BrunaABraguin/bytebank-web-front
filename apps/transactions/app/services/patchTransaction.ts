import { createHttpService } from "@bytebank-web/utils/http";
import { Transaction } from "@bytebank-web/types/transaction";
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
    date: transaction.date,
  });
  return response.data;
};
