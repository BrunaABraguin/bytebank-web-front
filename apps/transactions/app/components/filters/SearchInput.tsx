import { Input } from "@bytebank-web/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ 
  value, 
  onSearch, 
  placeholder = "Buscar por descrição..." 
}: Readonly<SearchInputProps>) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        className="pl-8"
      />
    </div>
  );
}