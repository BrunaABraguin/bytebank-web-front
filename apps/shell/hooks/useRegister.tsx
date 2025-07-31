import { ApiMessage } from "@bytebank-web/types/api";
import { setToken } from "@bytebank-web/utils/set-token";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postRegister } from "../services/register";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ name, email, password }: RegisterData) => {
      return postRegister(name, email, password);
    },
    onSuccess: ({ token, name, email }) => {
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

  return { mutate, error, isPending };
};
