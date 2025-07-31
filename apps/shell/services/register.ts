import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "../contants";

export const postRegister = async (
  email: string,
  password: string,
  name: string
): Promise<{
  token?: string;
  name: string;
  email: string;
}> => {
  const client = createHttpService(API_URL);

  const response = await client.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return {
    token: response.data.token,
    name: response.data.name,
    email: response.data.email,
  };
};
