import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@bytebank-web/utils/react-query";
import { postTransaction } from "./post-transaction.js";

export const useAddTransaction = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async ({
      email,
      value,
      type,
    }: {
      email: string;
      value: string;
      type: string;
    }) => {
      return postTransaction(email, type, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-chart"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
  return { data, mutate };
};
