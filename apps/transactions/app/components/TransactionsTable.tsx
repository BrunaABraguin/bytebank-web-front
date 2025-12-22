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
import { Loading } from "@bytebank-web/ui/loading";
import { useSharedStore } from "@bytebank-web/store";
import { useTransactions } from "@bytebank-web/utils/use-transactions";
import { Transaction } from "@bytebank-web/types/transaction";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";

import { TransactionsToolbar } from "./TransactionsToolbar";
import { TablePagination } from "./TablePagination";
import { DateCell } from "./cells/DateCell";
import { DescriptionCell } from "./cells/DescriptionCell";
import { ValueCell } from "./cells/ValueCell";
import { TypeCell } from "./cells/TypeCell";
import { CategoryCell } from "./cells/CategoryCell";
import { ActionsCell } from "./cells/ActionsCell";

import { useTablePagination } from "../hooks/useTablePagination";
import { useTransactionFilters } from "../hooks/useTransactionFilters";
import { useTransactionEdit } from "../hooks/useTransactionEdit";

export function TransactionsTable() {
  const { email } = useSharedStore();

  const { pageSize, pageIndex, updatePagination } = useTablePagination();
  const { typeFilter, searchFilter, updateTypeFilter, updateSearchFilter } =
    useTransactionFilters();

  const { transactions, isLoading, totalPages } = useTransactions(
    email,
    pageIndex + 1,
    pageSize,
    typeFilter
  );

  const { mutate: updateTransaction } = useEditTransaction();
  const { mutateDelete: deleteTransaction } = useDeleteTransaction();

  const {
    isEditing,
    editingData,
    errors,
    startEdit,
    cancelEdit,
    updateField,
    saveTransaction,
  } = useTransactionEdit({
    onSave: updateTransaction,
  });

  const handleDelete = (transactionId: Transaction["_id"]) => {
    deleteTransaction(transactionId);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => (
        <DateCell
          date={
            isEditing(row.original._id || "")
              ? editingData.date || row.original.date
              : row.original.date
          }
          isEditing={isEditing(row.original._id || "")}
          onUpdate={(value) => updateField("date", value)}
        />
      ),
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => (
        <DescriptionCell
          description={
            isEditing(row.original._id || "")
              ? editingData.description || row.original.description || ""
              : row.original.description || ""
          }
          isEditing={isEditing(row.original._id || "")}
          onUpdate={(value) => updateField("description", value)}
          onBlur={saveTransaction}
          error={errors.description}
        />
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => (
        <ValueCell
          value={
            isEditing(row.original._id || "")
              ? editingData.value || row.original.value || 0
              : row.original.value || 0
          }
          isEditing={isEditing(row.original._id || "")}
          onUpdate={(value) => updateField("value", value)}
          onBlur={saveTransaction}
          error={errors.value}
        />
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <TypeCell
          type={
            isEditing(row.original._id || "")
              ? editingData.type || row.original.type
              : row.original.type
          }
          isEditing={isEditing(row.original._id || "")}
          onUpdate={(value) => updateField("type", value)}
        />
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <CategoryCell
          category={
            isEditing(row.original._id || "")
              ? editingData.category || row.original.category || ""
              : row.original.category || ""
          }
          isEditing={isEditing(row.original._id || "")}
          onUpdate={(value) => updateField("category", value)}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <ActionsCell
          isEditing={isEditing(row.original._id || "")}
          onEdit={() => startEdit(row.original)}
          onSave={saveTransaction}
          onCancel={cancelEdit}
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
      pagination: { pageIndex, pageSize },
      globalFilter: searchFilter,
    },
    onPaginationChange: updatePagination,
    onGlobalFilterChange: updateSearchFilter,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <TransactionsToolbar
        searchValue={searchFilter}
        typeFilter={typeFilter}
        onSearchChange={updateSearchFilter}
        onTypeChange={updateTypeFilter}
        table={table}
        hasTransactions={!!transactions && transactions.length > 0}
        userEmail={email || ""}
      />

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

      <TablePagination table={table} />
    </div>
  );
}
