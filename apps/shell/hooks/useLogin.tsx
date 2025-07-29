import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";
import { AxiosError } from "axios";
import { useSharedStore } from "@workspace/store";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@workspace/utils/contants";
interface LoginParams {
  email: string;
  password: string;
}
interface ApiMessage {
  message: string;
}

export const useLogin = (email: string) => {
  const { setEmail } = useSharedStore();

  const { data, mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginService(email, password);
    },
    onSuccess: ({ token }) => {
      if (token) {
        document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`;
        setEmail(email);
        window.location.assign("/dashboard");
      } else {
        console.error("Token está ausente na resposta.");
      }
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
