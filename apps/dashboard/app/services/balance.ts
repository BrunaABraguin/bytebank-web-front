import { createHttpService } from "@workspace/utils/http";
import { Account } from "@workspace/types/account";

export const getBalanceAccount = async (
  ownerEmail: string | null
): Promise<Account> => {
  const client = createHttpService();

  const response = await client.get(`/api/account?email=${ownerEmail}`);
  return response.data;
};
