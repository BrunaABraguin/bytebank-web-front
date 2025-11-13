import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "./constants.js";

export async function postTransaction(
  email: string,
  type: string,
  value: string
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
