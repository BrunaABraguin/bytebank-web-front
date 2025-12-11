import { ApiMessage } from "@bytebank-web/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postRegister } from "../services/register";
import { useSharedStore } from "@bytebank-web/store";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
} from "@bytebank-web/utils/constants";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const { setEmail, setName } = useSharedStore();
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ name, email, password }: RegisterData) => {
      return postRegister(name, email, password);
    },
    onSuccess: ({ token, name, email }) => {
      document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`;
      setEmail(email);
      setName(name);
      globalThis.location.assign("/dashboard");
    },
    onError: (error: AxiosError) => {
      const apiError = error?.response?.data as ApiMessage;
      console.error("Erro ao tentar fazer login:", apiError.message);
    },
  });

  return {
    mutate,
    errorMessage: (error as AxiosError<ApiMessage>)?.response?.data.message,
    isPending,
    isSuccess,
  };
};
