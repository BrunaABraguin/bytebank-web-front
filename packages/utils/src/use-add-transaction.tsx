import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@bytebank-web/utils/react-query";
import { postTransaction } from "./post-transaction.js";
import { TransactionType } from "@bytebank-web/core";
import { DIContainer } from "@bytebank-web/shared";

export const useAddTransaction = () => {
  const { data, mutate, isSuccess, isPending } = useMutation({
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
      
      try {
        const createTransactionUseCase =
          DIContainer.getCreateTransactionUseCase();
        await createTransactionUseCase.execute({
          ownerEmail: email,
          description: "Transação criada pelo usuário",
          value: Number.parseFloat(value),
          type:
            type === "Receita"
              ? TransactionType.INCOME
              : TransactionType.EXPENSE,
          category: "Sem categoria",
        });
        return { message: "Transação criada com sucesso" };
      } catch (error) {
        
        console.error("Use case não disponível, usando fallback:", error);
        return postTransaction(email, type, value);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-chart"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });
  return { data, mutate, isSuccess, isPending };
};
