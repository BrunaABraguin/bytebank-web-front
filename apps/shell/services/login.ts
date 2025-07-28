import { createHttpService } from "@workspace/utils/http";

export const loginService = async (
  email: string,
  password: string
): Promise<{
  token?: string;
  error?: string;
}> => {
  const client = createHttpService();

  const response = await client.post("/api/auth/login", { email, password });
  return {
    token: response.data.token,
  };
};
