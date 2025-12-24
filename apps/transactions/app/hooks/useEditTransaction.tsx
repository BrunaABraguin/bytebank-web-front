import { patchTransaction } from "@/services/patchTransaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@bytebank-web/types/transaction";
import { queryClient } from "@bytebank-web/utils";

export const useEditTransaction = () => {
  const { mutate } = useMutation({
    mutationFn: async (transaction: Transaction) => {
      return patchTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-chart"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });

  return { mutate };
};
