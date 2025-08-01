import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";
import { AxiosError } from "axios";
import { useSharedStore } from "@bytebank-web/store";
import { ApiMessage } from "@bytebank-web/types/api";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@bytebank-web/utils/contants";
interface LoginParams {
  email: string;
  password: string;
}

export const useLogin = (email: string) => {
  const { setEmail, setName } = useSharedStore();
  const { data, mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginService(email, password);
    },
    onSuccess: ({ token, name }) => {
      document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`;
      setEmail(email);
      setName(name);
      window.location.assign("/dashboard");
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
