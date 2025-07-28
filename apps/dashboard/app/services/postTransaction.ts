import { createHttpService } from "@workspace/utils/http";
import { API_URL } from "@/contants";

export async function postTransaction(
  email: string,
  type: string,
  value: number
): Promise<{ message: string }> {
  const client = createHttpService(API_URL);
  const transaction = {
    email,
    type,
    value,
  };
  const response = await client.post("api/transactions", transaction);
  return { message: response.data.message };
}
