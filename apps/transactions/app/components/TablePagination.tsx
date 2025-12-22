import { Button } from "@bytebank-web/ui/button";
import { Table } from "@tanstack/react-table";

interface TablePaginationProps<T = unknown> {
  table: Table<T>;
}

export function TablePagination<T = unknown>({
  table,
}: Readonly<TablePaginationProps<T>>) {
  return (
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
  );
}
