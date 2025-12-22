import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface BankSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const BankSelector = ({ value, onValueChange }: BankSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Banco</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="itau">Itaú</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
