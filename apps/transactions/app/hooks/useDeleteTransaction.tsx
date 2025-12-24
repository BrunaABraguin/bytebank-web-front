import { deleteTransaction } from "@/services/deleteTransaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@bytebank-web/types/transaction";
import { queryClient } from "@bytebank-web/utils";

export const useDeleteTransaction = () => {
  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (transactionId: Transaction["_id"]) => {
      return deleteTransaction(transactionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-chart"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });

  return { mutateDelete };
};
