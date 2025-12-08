"use client";

import { Button } from "@bytebank-web/ui/button";
import { Edit, Trash } from "lucide-react";
import { CellProps } from "../../types";

export function ActionsCell({
  isEditing,
  onSave,
  onCancel,
  onStartEdit,
  onDelete,
}: Readonly<CellProps>) {
  return (
    <div className="flex space-x-2">
      {isEditing ? (
        <>
          <Button size="sm" onClick={onSave}>
            Salvar
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={onStartEdit}
          >
            <Edit />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="size-8"
            onClick={onDelete}
          >
            <Trash />
          </Button>
        </>
      )}
    </div>
  );
}
