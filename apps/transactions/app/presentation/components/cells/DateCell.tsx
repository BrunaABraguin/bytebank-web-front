"use client";

import { Input } from "@bytebank-web/ui/input";
import { CellProps } from "../../types";

export function DateCell({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: Readonly<CellProps>) {
  if (isEditing) {
    const date = new Date(editingData?.date || row.original.date);
    const formattedDate = date.toISOString().split("T")[0];

    return (
      <Input
        className="w-28"
        type="date"
        defaultValue={formattedDate}
        onChange={(e) =>
          onEditingDataChange?.({ ...editingData, date: e.target.value })
        }
      />
    );
  }

  const date = new Date(row.original.date);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return <div>{formattedDate}</div>;
}
