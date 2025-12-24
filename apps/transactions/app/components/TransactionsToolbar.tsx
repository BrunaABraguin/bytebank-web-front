import { TransactionForm } from "@bytebank-web/ui/transactionForm";
import { SearchInput } from "./filters/SearchInput";
import { TypeFilter } from "./filters/TypeFilter";
import { ColumnSelector } from "./filters/ColumnSelector";
import { TransactionEnum, Transaction } from "@bytebank-web/types/transaction";
import { Table } from "@tanstack/react-table";
import { useAddTransaction } from "@bytebank-web/utils";
import { FileUpload } from "./FileUpload";

interface TransactionsToolbarProps {
  searchValue: string;
  typeFilter: TransactionEnum | "";
  onSearchChange: (value: string) => void;
  onTypeChange: (type: TransactionEnum | "") => void;
  table: Table<Transaction>;
  hasTransactions: boolean;
  userEmail: string;
}

export function TransactionsToolbar({
  searchValue,
  typeFilter,
  onSearchChange,
  onTypeChange,
  table,
  hasTransactions,
  userEmail,
}: Readonly<TransactionsToolbarProps>) {
  const { mutate, isSuccess, isPending } = useAddTransaction();

  return (
    <div className="flex items-center justify-between py-4">
      <SearchInput value={searchValue} onSearch={onSearchChange} />

      <div className="flex items-center space-x-2">
        <FileUpload userEmail={userEmail} />
        <TransactionForm
          isSuccess={isSuccess}
          isPending={isPending}
          onMutate={mutate}
          userEmail={userEmail}
          aria-label="Formulário de Transações"
        />
        <TypeFilter value={typeFilter} onTypeChange={onTypeChange} />
        {hasTransactions && <ColumnSelector table={table} />}
      </div>
    </div>
  );
}
