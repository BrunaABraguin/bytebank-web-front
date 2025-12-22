import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bytebank-web/ui/select";
import { TransactionEnum } from "@bytebank-web/types/transaction";

interface TypeCellProps {
  type: TransactionEnum;
  isEditing: boolean;
  onUpdate: (value: TransactionEnum) => void;
}

const typeLabels = {
  [TransactionEnum.INCOME]: "Receita",
  [TransactionEnum.EXPENSE]: "Despesa",
  [TransactionEnum.TRANSFER]: "Transferência",
};

const getTypeStyle = (type: TransactionEnum): React.CSSProperties => {
  switch (type) {
    case TransactionEnum.INCOME:
      return {
        color: "#16a34a",
        fontWeight: "600",
        backgroundColor: "#f0fdf4",
        padding: "4px 8px",
        borderRadius: "6px",
        border: "1px solid #bbf7d0",
      };
    case TransactionEnum.EXPENSE:
      return {
        color: "#dc2626",
        fontWeight: "600",
        backgroundColor: "#fef2f2",
        padding: "4px 8px",
        borderRadius: "6px",
        border: "1px solid #fecaca",
      };
    default:
      return {
        color: "#2563eb",
        fontWeight: "600",
        backgroundColor: "#eff6ff",
        padding: "4px 8px",
        borderRadius: "6px",
        border: "1px solid #bfdbfe",
      };
  }
};

const getTypeItemClass = (type: TransactionEnum): string => {
  switch (type) {
    case TransactionEnum.INCOME:
      return "text-green-600 font-semibold";
    case TransactionEnum.EXPENSE:
      return "text-red-600 font-semibold";
    default:
      return "text-blue-600 font-semibold";
  }
};

export function TypeCell({
  type,
  isEditing,
  onUpdate,
}: Readonly<TypeCellProps>) {
  if (isEditing) {
    return (
      <Select
        value={type}
        onValueChange={(value) => onUpdate(value as TransactionEnum)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value={TransactionEnum.INCOME}
            className={getTypeItemClass(TransactionEnum.INCOME)}
          >
            {typeLabels[TransactionEnum.INCOME]}
          </SelectItem>
          <SelectItem
            value={TransactionEnum.EXPENSE}
            className={getTypeItemClass(TransactionEnum.EXPENSE)}
          >
            {typeLabels[TransactionEnum.EXPENSE]}
          </SelectItem>
          <SelectItem
            value={TransactionEnum.TRANSFER}
            className={getTypeItemClass(TransactionEnum.TRANSFER)}
          >
            {typeLabels[TransactionEnum.TRANSFER]}
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return <div style={getTypeStyle(type)}>{typeLabels[type] || type}</div>;
}
