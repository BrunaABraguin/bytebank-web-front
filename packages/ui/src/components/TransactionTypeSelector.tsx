import { TransactionEnum } from "@bytebank-web/types/transaction";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface TransactionTypeSelectorProps {
  value: TransactionEnum;
  onValueChange: (value: TransactionEnum) => void;
  disabled?: boolean;
}

export function TransactionTypeSelector({
  value,
  onValueChange,
  disabled = false,
}: TransactionTypeSelectorProps) {
  const transactionTypes = Object.values(TransactionEnum);

  return (
    <div className="grid gap-3">
      <Label htmlFor="transactionType" id="transactionType-label">
        Tipo
      </Label>
      <Select
        onValueChange={(selectedValue) =>
          onValueChange(selectedValue as TransactionEnum)
        }
        defaultValue={value}
        disabled={disabled}
      >
        <SelectTrigger
          className="w-45"
          aria-label="Tipo de transação"
          id="transactionType"
          aria-labelledby="transactionType-label"
        >
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {transactionTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
