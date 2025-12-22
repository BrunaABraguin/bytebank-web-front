import {
  CurrencyFormatter,
  DateFormatter,
  TransactionTypeValidator,
} from "@/services/formatting";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";

interface TransactionDisplayProps {
  transaction: TransactionType;
}

export const TransactionDisplay = ({
  transaction,
}: TransactionDisplayProps) => {
  const isExpense = TransactionTypeValidator.isExpense(transaction.type);

  return (
    <div key={transaction._id} className="mb-4 border-b border-green pb-2">
      <div className="flex justify-between text-sm text-green font-semibold">
        <span>{DateFormatter.formatMonth(transaction.date)}</span>
        <span className="text-gray-400">
          {DateFormatter.formatDate(transaction.date)}
        </span>
      </div>
      <div className="text-black font-medium">{transaction.type}</div>
      <div className="text-gray-600 font-medium">{transaction.description}</div>
      <div
        className={`font-bold ${isExpense ? "text-red-600" : "text-green-600"}`}
      >
        {isExpense
          ? `-${CurrencyFormatter.formatCurrency(Math.abs(transaction.value))}`
          : CurrencyFormatter.formatCurrency(transaction.value)}
      </div>
    </div>
  );
};
