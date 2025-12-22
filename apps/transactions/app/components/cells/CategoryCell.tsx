import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bytebank-web/ui/select";
import categories from "@bytebank-web/utils/categories";

interface CategoryCellProps {
  category: string;
  isEditing: boolean;
  onUpdate: (value: string) => void;
}

export function CategoryCell({
  category,
  isEditing,
  onUpdate,
}: Readonly<CategoryCellProps>) {
  if (isEditing) {
    return (
      <Select value={category || "Sem categoria"} onValueChange={onUpdate}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Sem categoria">Sem categoria</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return <div title={category}>{category || "Sem categoria"}</div>;
}
