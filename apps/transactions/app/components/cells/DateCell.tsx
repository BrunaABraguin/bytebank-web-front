import { Input } from "@bytebank-web/ui/input";
import { useState, useEffect } from "react";
import { DateFormatter } from "../../services/formatting";

interface DateCellProps {
  date: string | Date;
  isEditing: boolean;
  onUpdate: (value: string) => void;
}

export function DateCell({
  date,
  isEditing,
  onUpdate,
}: Readonly<DateCellProps>) {
  const formattedDate = DateFormatter.formatToLocal(date);
  const inputFormat = DateFormatter.toInputFormat(date);
  const [value, setValue] = useState(inputFormat);

  useEffect(() => {
    setValue(inputFormat);
  }, [inputFormat, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onUpdate(newValue);
  };

  if (isEditing) {
    return (
      <Input
        className="w-36 text-sm"
        type="date"
        value={value}
        onChange={handleChange}
      />
    );
  }

  return <div>{formattedDate}</div>;
}
