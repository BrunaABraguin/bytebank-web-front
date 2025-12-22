import { useState, useCallback } from "react";
import { TransactionEnum } from "@bytebank-web/types/transaction";

// Hook para gerenciar estado do formulário
export function useTransactionForm() {
  const [transactionType, setTransactionType] = useState<TransactionEnum>(
    TransactionEnum.INCOME
  );
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [errors, setErrors] = useState<{ transactionValue?: string }>({});

  const resetForm = useCallback(() => {
    setTransactionValue("");
    setTransactionType(TransactionEnum.INCOME);
    setErrors({});
  }, []);

  return {
    transactionType,
    setTransactionType,
    transactionValue,
    setTransactionValue,
    errors,
    setErrors,
    resetForm,
  };
}
