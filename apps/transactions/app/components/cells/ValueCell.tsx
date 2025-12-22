import { Input } from "@bytebank-web/ui/input";
import { useState, useEffect } from "react";
import { CurrencyFormatter } from "../../services/formatting";

interface ValueCellProps {
  value: number;
  isEditing: boolean;
  onUpdate: (value: number) => void;
  onBlur?: () => void;
  error?: string;
}

export function ValueCell({
  value,
  isEditing,
  onUpdate,
  onBlur,
  error,
}: Readonly<ValueCellProps>) {
  const [inputValue, setInputValue] = useState(value.toString());
  const formattedValue = CurrencyFormatter.formatToBRL(value);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onUpdate(Number.parseFloat(newValue) || 0);
  };

  if (isEditing) {
    return (
      <div className="space-y-1">
        <Input
          className={`w-28 ${error ? "border-red-500" : ""}`}
          type="number"
          step="0.01"
          min="0"
          value={inputValue}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }

  return <div>{formattedValue}</div>;
}
