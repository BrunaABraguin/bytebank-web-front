import { createHttpService } from "@workspace/utils/http";
import { API_URL } from "../contants";

export const loginService = async (
  email: string,
  password: string
): Promise<{
  token?: string;
  error?: string;
}> => {
  const client = createHttpService(API_URL);

  const response = await client.post("/api/auth/login", { email, password });
  return {
    token: response.data.token,
  };
};
