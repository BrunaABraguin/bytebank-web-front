import { Input } from "@bytebank-web/ui/input";
import { useState, useEffect } from "react";

interface DescriptionCellProps {
  description: string;
  isEditing: boolean;
  onUpdate: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

export function DescriptionCell({
  description,
  isEditing,
  onUpdate,
  onBlur,
  error,
}: Readonly<DescriptionCellProps>) {
  const [value, setValue] = useState(description);

  useEffect(() => {
    setValue(description);
  }, [description, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onUpdate(newValue);
  };

  if (isEditing) {
    return (
      <div className="space-y-1">
        <Input
          className={`w-40 ${error ? "border-red-500" : ""}`}
          value={value}
          placeholder="Digite uma descrição"
          onChange={handleChange}
          onBlur={onBlur}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }

  return <div title={description}>{description || "Sem descrição"}</div>;
}
