import { Transaction as TransactionType } from "@workspace/types/transaction";
import { Button } from "@workspace/ui/Button";
import { Ellipsis } from "lucide-react";

interface TransactionProps {
  transaction: TransactionType;
}

export const Transaction = ({ transaction }: TransactionProps) => {
  const isNegative = (type: string) => {
    return type !== "Receita";
  };

  return (
    <div key={transaction._id} className="mb-4 border-b border-green pb-2">
      <div className="flex justify-between text-sm text-green font-semibold">
        <span>
          {(() => {
            const month = new Date(transaction.date).toLocaleString("pt-BR", {
              month: "long",
            });
            return month.charAt(0).toUpperCase() + month.slice(1);
          })()}
        </span>
        <span className="text-gray-400">
          {new Date(transaction.date).toLocaleDateString("pt-BR")}
        </span>
      </div>

      <div className="text-black font-medium flex justify-between gap-2">
        {transaction.type}
        <Button variant="ghost" size="icon" className="size-8">
          <Ellipsis size={16} />
        </Button>
      </div>

      <div
        className={`font-bold ${
          isNegative(transaction.type) ? "text-red-600" : "text-black"
        }`}
      >
        {isNegative(transaction.type)
          ? `-R$ ${Math.abs(transaction.value)}`
          : `R$ ${transaction.value}`}
      </div>
    </div>
  );
};
