import { postTransaction } from "@/services/postTransaction";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@workspace/utils/react-query";

export const useAddTransaction = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async ({
      email,
      value,
      type,
    }: {
      email: string;
      value: number;
      type: string;
    }) => {
      return postTransaction(email, type, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  return { data, mutate };
};
