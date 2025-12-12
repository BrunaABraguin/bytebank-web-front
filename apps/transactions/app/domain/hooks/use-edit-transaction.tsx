import { patchTransaction } from "@/domain/services/patchTransaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@bytebank-web/types/transaction";
import { queryClient, CACHE_KEYS } from "@bytebank-web/utils/react-query";

export const useEditTransaction = () => {
  const { mutate } = useMutation({
    mutationFn: async (transaction: Transaction) => {
      return patchTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEYS.transactions.all });
      queryClient.invalidateQueries({ queryKey: ["monthly-chart"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });

  return { mutate };
};
