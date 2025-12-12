import { CellProps } from "@/presentation/types";
import { Input } from "@bytebank-web/ui/input";

export const DateCell = ({
  row,
  isEditing,
  editingData,
  onEditingDataChange,
}: CellProps) => {
  const date = new Date(row.original.date);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (isEditing) {
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

  return <div>{formattedDate}</div>;
};
