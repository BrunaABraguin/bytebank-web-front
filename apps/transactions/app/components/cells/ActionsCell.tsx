import { Button } from "@bytebank-web/ui/button";
import { Edit, Trash, Save, X } from "lucide-react";

interface ActionsCellProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export function ActionsCell({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: Readonly<ActionsCellProps>) {
  if (isEditing) {
    return (
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="outline"
          onClick={onSave}
          className="size-8 p-0"
        >
          <Save className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCancel}
          className="size-8 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex space-x-1">
      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={onEdit}
      >
        <Edit className="h-3 w-3" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="size-8"
        onClick={onDelete}
      >
        <Trash className="h-3 w-3" />
      </Button>
    </div>
  );
}
