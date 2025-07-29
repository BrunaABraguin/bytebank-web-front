import { deleteTransaction } from "@/services/deleteTransaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@workspace/types/transaction";
import { queryClient } from "@workspace/utils/react-query";

export const useDeleteTransaction = () => {
  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (transactionId: Transaction["_id"]) => {
      return deleteTransaction(transactionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return { mutateDelete };
};
