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
} from "@bytebank-web/ui/table";
import { FileUpload } from "@bytebank-web/ui/fileUpload";
import { Input } from "@bytebank-web/ui/input";
import { Button } from "@bytebank-web/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bytebank-web/ui/dropdown-menu";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { useSharedStore } from "@bytebank-web/store";
import { useTransactions } from "@bytebank-web/utils/use-transactions";
import { Transaction, TransactionEnum } from "@bytebank-web/types/transaction";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@bytebank-web/ui/select";
import categories from "@bytebank-web/utils/categories";
import { useState } from "react";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { TransactionForm } from "@bytebank-web/ui/transactionForm";
import { Loading } from "@bytebank-web/ui/loading";

export function TransactionsTable() {
  const { email } = useSharedStore();
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState<TransactionEnum | "">("");
  const { transactions, isLoading, totalPages } = useTransactions(
    email,
    pageIndex + 1,
    pageSize,
    type
  );
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
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;
        const date = new Date(row.original.date);
        const formattedDate = date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        if (isEditing) {
          return (
            <Input
              className="w-28"
              type="date"
              defaultValue={formattedDate}
              onChange={(e) => (row.original.date = e.target.value)}
            />
          );
        }

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => {
        const isEditing = editRowId === row.id;

        if (isEditing) {
          return (
            <Input
              className="w-28"
              defaultValue={row.original.description}
              onChange={(e) => (row.original.description = e.target.value)}
              onBlur={() => handleSave(row.original)}
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

        if (isEditing) {
          return (
            <Input
              className="w-28"
              type="number"
              defaultValue={row.original.value}
              onChange={(e) =>
                (row.original.value =
                  Number.parseFloat(e.target.value) || row.original.value)
              }
              onBlur={() => handleSave(row.original)}
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

        if (isEditing) {
          return (
            <Select
              defaultValue={row.original.type}
              onValueChange={(value) => {
                row.original.type = value as TransactionEnum;
              }}
              autoComplete="select"
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

        if (isEditing) {
          return (
            <Select
              defaultValue={row.original.category || "Sem categoria"}
              onValueChange={(value) => {
                row.original.category = value;
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
              <div className="flex space-x-2">
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
              </div>
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
    pageCount: totalPages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      let newPagination;
      if (typeof updater === "function") {
        newPagination = updater({ pageIndex, pageSize });
      } else {
        newPagination = updater;
      }
      setPageIndex(newPagination.pageIndex ?? 0);
      setPageSize(newPagination.pageSize ?? 10);
    },
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-80">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar por descrição..."
              className="max-w-sm"
              value={
                (table.getColumn("description")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("description")
                  ?.setFilterValue(event.target.value)
              }
            />
            <div className="flex items-center space-x-2 ml-auto">
              <FileUpload />
              <TransactionForm />
              <Select
                defaultValue={type}
                onValueChange={(value) => {
                  setType(value as TransactionEnum);
                }}
                autoComplete="select"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all"> Todos</SelectItem>
                  <SelectItem value={TransactionEnum.INCOME}>
                    Receita
                  </SelectItem>
                  <SelectItem value={TransactionEnum.EXPENSE}>
                    Despesa
                  </SelectItem>
                  <SelectItem value={TransactionEnum.TRANSFER}>
                    Transferência
                  </SelectItem>
                </SelectContent>
              </Select>
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
                            {column.columnDef.header as string}
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
        </>
      )}
    </div>
  );
}
