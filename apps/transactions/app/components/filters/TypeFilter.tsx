import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bytebank-web/ui/select";
import { TransactionEnum } from "@bytebank-web/types/transaction";

interface TypeFilterProps {
  value: TransactionEnum | "";
  onTypeChange: (type: TransactionEnum | "") => void;
}

export function TypeFilter({ value, onTypeChange }: Readonly<TypeFilterProps>) {
  const handleValueChange = (val: string) => {
    if (val === "all") {
      onTypeChange("");
    } else {
      onTypeChange(val as TransactionEnum);
    }
  };

  const selectValue = value === "" ? "all" : value;

  return (
    <Select value={selectValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Filtrar por tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value={TransactionEnum.INCOME}>Receita</SelectItem>
        <SelectItem value={TransactionEnum.EXPENSE}>Despesa</SelectItem>
        <SelectItem value={TransactionEnum.TRANSFER}>Transferência</SelectItem>
      </SelectContent>
    </Select>
  );
}
