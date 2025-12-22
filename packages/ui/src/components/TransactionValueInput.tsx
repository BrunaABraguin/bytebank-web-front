import { Input } from "../input";
import { Label } from "../label";

interface TransactionValueInputProps {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function TransactionValueInput({
  value,
  onValueChange,
  error,
  disabled = false,
}: TransactionValueInputProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor="transactionValue">Valor</Label>
      <Input
        id="transactionValue"
        name="transactionValue"
        placeholder="00.00"
        type="number"
        value={value}
        className="w-45"
        onChange={(e) => onValueChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby="transactionValue-error"
        disabled={disabled}
      />
      {error && (
        <span id="transactionValue-error" className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}
