import { createHttpService } from "@bytebank-web/utils/http";
import { Account } from "@bytebank-web/types/account";
import { API_URL } from "@/contants";

export const getBalanceAccount = async (
  ownerEmail: string | null
): Promise<Account> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/account", {
    params: { email: ownerEmail },
  });
  return response.data;
};
