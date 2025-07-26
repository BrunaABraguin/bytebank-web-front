import { createHttpService } from "@workspace/utils/http";
import { API_URL } from "../../../shell/contants";
import { Account } from "@workspace/types/account";

export const getBalanceAccount = async (
  ownerEmail: string | null
): Promise<Account> => {
  const client = createHttpService(API_URL as string);

  const response = await client.get(`/api/account?email=${ownerEmail}`);
  return response.data;
};
