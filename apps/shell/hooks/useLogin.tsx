import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";
import { AxiosError } from "axios";
import { setToken } from "@bytebank-web/utils/set-token";
import { ApiMessage } from "@bytebank-web/types/api";
interface LoginParams {
  email: string;
  password: string;
}

export const useLogin = (email: string) => {
  const { data, mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginService(email, password);
    },
    onSuccess: ({ token, name }) => {
      if (!token || !name) {
        console.error("Token ou nome ausente na resposta.");
        return;
      }
      setToken(token, name, email);
    },
    onError: (error: AxiosError) => {
      const apiError = error?.response?.data as ApiMessage;
      console.error("Erro ao tentar fazer login:", apiError.message);
    },
  });

  return {
    data,
    mutate,
    isPending,
    isSuccess,
    errorMessage: (error as AxiosError<ApiMessage>)?.response?.data.message,
  };
};
