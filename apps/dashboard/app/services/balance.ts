import { createHttpService } from "@bytebank-web/utils";
import { Account } from "@bytebank-web/types/account";
import { API_URL } from "@/constants";

export const getBalanceAccount = async (
  ownerEmail: string | null,
  month: number,
  year: number
): Promise<Account> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/account", {
    params: { email: ownerEmail, month, year },
  });
  return response.data;
};
