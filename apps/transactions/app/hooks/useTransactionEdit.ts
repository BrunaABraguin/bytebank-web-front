import { useState, useCallback } from "react";
import { Transaction } from "@bytebank-web/types/transaction";
import { TransactionValidator } from "../services/validators";

interface UseTransactionEditProps {
  onSave: (transaction: Transaction) => void;
}

export function useTransactionEdit({ onSave }: UseTransactionEditProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Transaction>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startEdit = useCallback((transaction: Transaction) => {
    setEditingId(transaction._id || null);
    setEditingData({ ...transaction });
    setErrors({});
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingData({});
    setErrors({});
  }, []);

  const updateField = useCallback(
    (field: keyof Transaction, value: Transaction[keyof Transaction]) => {
      setEditingData((prev) => {
        const updatedData = { ...prev, [field]: value };
        const fieldErrors =
          TransactionValidator.validateTransaction(updatedData);
        setErrors(fieldErrors);
        return updatedData;
      });
    },
    []
  );

  const saveTransaction = useCallback(() => {
    if (!editingData || !editingId) return;

    const validationErrors =
      TransactionValidator.validateTransaction(editingData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(editingData as Transaction);
    cancelEdit();
  }, [editingData, editingId, onSave, cancelEdit]);

  const isEditing = useCallback((id: string) => editingId === id, [editingId]);

  return {
    editingId,
    editingData,
    errors,
    startEdit,
    cancelEdit,
    updateField,
    saveTransaction,
    isEditing,
  };
}
