"use client";

import { Input } from "@bytebank-web/ui/input";
import { CellProps } from "../../types";

export function DescriptionCell({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: Readonly<CellProps>) {
  if (isEditing) {
    return (
      <Input
        className="w-28"
        defaultValue={editingData?.description || row.original.description}
        onChange={(e) =>
          onEditingDataChange?.({ ...editingData, description: e.target.value })
        }
      />
    );
  }

  return <div>{row.original.description || "Sem descrição"}</div>;
}
