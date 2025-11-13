import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "../constants";

export const postRegister = async (
  name: string,
  email: string,
  password: string
): Promise<{
  token: string;
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
