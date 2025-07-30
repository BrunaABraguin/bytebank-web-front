import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "./contants.js";

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
    description: "",
    category: "Sem categoria",
  };
  const response = await client.post("api/transactions", transaction);
  return { message: response.data.message };
}
