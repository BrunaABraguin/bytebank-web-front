import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

interface LoginParams {
  email: string;
  password: string;
}
export interface ApiMessage {
  message: string;
}

export const useLogin = () => {
  const { data, mutate, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginParams) => {
      return loginService(email, password);
    },
    onSuccess: ({ token }) => {
      if (token) {
        localStorage.setItem("auth_token", token);
        redirect("/dashboard");
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
    errorMessage: (error as AxiosError<ApiMessage>)?.response?.data.message,
  };
};
