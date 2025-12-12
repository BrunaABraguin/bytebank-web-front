"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@bytebank-web/ui/select";
import { TransactionEnum } from "@bytebank-web/types/transaction";
import { CellProps } from "../../types";

export function TypeCell({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: Readonly<CellProps>) {
  if (isEditing) {
    return (
      <Select
        defaultValue={editingData?.type || row.original.type}
        onValueChange={(value) => {
          onEditingDataChange?.({
            ...editingData,
            type: value as TransactionEnum,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TransactionEnum.INCOME}>Receita</SelectItem>
          <SelectItem value={TransactionEnum.EXPENSE}>Despesa</SelectItem>
          <SelectItem value={TransactionEnum.TRANSFER}>
            Transferência
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div
      className={`${
        row.original.type === TransactionEnum.INCOME
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {row.original.type}
    </div>
  );
}
