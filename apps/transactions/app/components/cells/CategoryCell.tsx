"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@bytebank-web/ui/select";
import categories from "@bytebank-web/utils/categories";
import { CellProps } from "../../types";

export function CategoryCell({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: Readonly<CellProps>) {
  if (isEditing) {
    return (
      <Select
        defaultValue={
          editingData?.category || row.original.category || "Sem categoria"
        }
        onValueChange={(value) => {
          onEditingDataChange?.({ ...editingData, category: value });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return <div>{row.original.category || "Sem categoria"}</div>;
}
