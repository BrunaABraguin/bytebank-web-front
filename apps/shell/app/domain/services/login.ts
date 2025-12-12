import { API_URL } from "@bytebank-web/utils/constants";
import { createHttpService } from "@bytebank-web/utils/http";

export const loginService = async (
  email: string,
  password: string
): Promise<{
  token: string;
  name: string;
}> => {
  const client = createHttpService(API_URL);

  const response = await client.post("/api/auth/login", { email, password });
  return {
    token: response.data.token,
    name: response.data.name,
  };
};
