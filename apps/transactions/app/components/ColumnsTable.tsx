import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/dropdown-menu";
import { Input } from "@workspace/ui/input";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
}


export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: () => <span>Descrição</span>,
    cell: ({ row, getValue }) => {
      const [isEditing, setIsEditing] = useState(false);
      const value = getValue() as string;
      const [editedValue, setEditedValue] = useState(value);

      const handleSave = () => {
        setIsEditing(false);
        console.log("Descrição atualizada:", editedValue);
        row.original.description = editedValue; // Atualize localmente ou envie para API
      };

      return isEditing ? (
        <div>
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="mb-2"
          />
          <Button variant="ghost" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span>{row.getValue("description")}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <span className="text-right">Valor</span>,
    cell: ({ row }) => {
      const value = row.getValue("value") as number;
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
      return <div className="text-right font-medium">{formattedValue}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as "income" | "expense";
      const typeClass = type === "income" ? "text-green-500" : "text-red-500";
      return (
        <span className={typeClass}>
          {type === "income" ? "Receita" : "Despesa"}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue("category") as string | undefined;
      return <span>{category || "Sem categoria"}</span>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ações</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Visualizar:", row.original)}
          >
            Visualizar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
