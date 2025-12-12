"use client";

import { Input } from "@bytebank-web/ui/input";
import { CellProps } from "../../types";

export function ValueCell({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: Readonly<CellProps>) {
  if (isEditing) {
    return (
      <Input
        className="w-28"
        type="number"
        defaultValue={editingData?.value || row.original.value}
        onChange={(e) =>
          onEditingDataChange?.({
            ...editingData,
            value: Number.parseFloat(e.target.value) || row.original.value,
          })
        }
      />
    );
  }

  return (
    <div>
      {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.value || 0)}
    </div>
  );
}
