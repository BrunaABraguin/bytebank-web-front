"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/table";
import { Input } from "@workspace/ui/input";
import { Button } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { useSharedStore } from "@workspace/store";
import { useTransactions } from "@workspace/utils/use-transactions";
import { Transaction, TransactionEnum } from "@workspace/types/transaction";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/select";
import categories from "@workspace/utils/categories";
import { useState } from "react";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { TransactionForm } from "@workspace/ui/transactionForm";

export function TransactionsTable() {
  const { email } = useSharedStore();
  const { transactions } = useTransactions(email);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const { mutate } = useEditTransaction();
  const { mutateDelete } = useDeleteTransaction();

  const handleSave = (updatedRow: Transaction) => {
    mutate(updatedRow);
    setEditRowId(null);
  };

  const handleDelete = (transactionId: Transaction["_id"]) => {
    mutateDelete(transactionId);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;
        const [editedDescription, setEditedDescription] = useState(
          row.original.description
        );

        if (isEditing) {
          return (
            <Input
              className="w-28"
              defaultValue={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={() => (row.original.description = editedDescription)}
            />
          );
        }

        return <div>{row.original.description || "Sem descrição"}</div>;
      },
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;
        const [editedValue, setEditedValue] = useState(row.original.value);

        if (isEditing) {
          return (
            <Input
              className="w-28"
              type="number"
              defaultValue={editedValue}
              onChange={(e) =>
                setEditedValue(parseFloat(e.target.value) || row.original.value)
              }
              onBlur={() => (row.original.value = editedValue)}
            />
          );
        }

        return (
          <div>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(row.original.value || 0)}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;
        const [editedType, setEditedType] = useState(row.original.type);

        if (isEditing) {
          return (
            <Select
              defaultValue={editedType}
              onValueChange={(value) => {
                setEditedType(value as TransactionEnum);
                row.original.type = value as TransactionEnum;
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TransactionEnum.INCOME}>Receita</SelectItem>
                <SelectItem value={TransactionEnum.EXPENSE}>Despesa</SelectItem>
                <SelectItem value={TransactionEnum.TRANSFER}>
                  Transferência
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }

        return (
          <div
            className={`${
              row.original.type === TransactionEnum.INCOME
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {row.original.type}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;
        const [editedCategory, setEditedCategory] = useState(
          row.original.category || "Sem categoria"
        );

        if (isEditing) {
          return (
            <Select
              defaultValue={editedCategory}
              onValueChange={(value) => {
                setEditedCategory(value as string);
                row.original.category = value as string;
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        return <div>{row.original.category || "Sem categoria"}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;

        return (
          <div className="flex">
            {isEditing ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSave(row.original)}
              >
                Salvar
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8"
                  onClick={() => setEditRowId(row.id)}
                >
                  <Edit />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="size-8"
                  onClick={() => handleDelete(row.original._id)}
                >
                  <Trash />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: transactions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por descrição..."
          className="max-w-sm"
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
        />
        <div className="flex items-center space-x-2 ml-auto">
          <TransactionForm />
          {transactions && transactions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
