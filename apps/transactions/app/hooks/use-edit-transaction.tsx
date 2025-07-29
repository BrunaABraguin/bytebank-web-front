import { patchTransaction } from "@/services/patchTransaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@workspace/types/transaction";
import { queryClient } from "@workspace/utils/react-query";

export const useEditTransaction = () => {
  const { mutate } = useMutation({
    mutationFn: async (transaction: Transaction) => {
      return patchTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return { mutate };
};
