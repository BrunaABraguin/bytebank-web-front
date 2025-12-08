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
import { ChevronDown } from "lucide-react";
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
import { useState } from "react";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { TransactionForm } from "@bytebank-web/ui/transactionForm";
import { Loading } from "@bytebank-web/ui/loading";
import { DateCell } from "./cells/DateCell";
import { DescriptionCell } from "./cells/DescriptionCell";
import { ValueCell } from "./cells/ValueCell";
import { TypeCell } from "./cells/TypeCell";
import { CategoryCell } from "./cells/CategoryCell";
import { ActionsCell } from "./cells/ActionsCell";

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
  const [editingData, setEditingData] = useState<Partial<Transaction>>({});
  const { mutate } = useEditTransaction();
  const { mutateDelete } = useDeleteTransaction();

  const handleSave = (updatedRow: Transaction) => {
    const finalData = { ...updatedRow, ...editingData };
    mutate(finalData);
    setEditRowId(null);
    setEditingData({});
  };

  const handleStartEdit = (row: Transaction) => {
    setEditRowId(row._id || null);
    setEditingData({
      description: row.description,
      value: row.value,
      type: row.type,
      category: row.category,
    });
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditingData({});
  };

  const handleDelete = (transactionId: Transaction["_id"]) => {
    mutateDelete(transactionId);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => (
        <DateCell
          row={row}
          isEditing={editRowId === row.id}
          editingData={editingData}
          onEditingDataChange={setEditingData}
        />
      ),
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => (
        <DescriptionCell
          row={row}
          isEditing={editRowId === row.id}
          editingData={editingData}
          onEditingDataChange={setEditingData}
        />
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => (
        <ValueCell
          row={row}
          isEditing={editRowId === row.id}
          editingData={editingData}
          onEditingDataChange={setEditingData}
        />
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <TypeCell
          row={row}
          isEditing={editRowId === row.id}
          editingData={editingData}
          onEditingDataChange={setEditingData}
        />
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <CategoryCell
          row={row}
          isEditing={editRowId === row.id}
          editingData={editingData}
          onEditingDataChange={setEditingData}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <ActionsCell
          row={row}
          isEditing={editRowId === row.id}
          onSave={() => handleSave(row.original)}
          onCancel={handleCancelEdit}
          onStartEdit={() => handleStartEdit(row.original)}
          onDelete={() => handleDelete(row.original._id)}
        />
      ),
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
