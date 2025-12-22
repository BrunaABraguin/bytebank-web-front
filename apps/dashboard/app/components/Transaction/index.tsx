import { TransactionDisplay } from "../TransactionDisplay";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";

interface TransactionProps {
  transaction: TransactionType;
}

export const Transaction = ({ transaction }: TransactionProps) => {
  return <TransactionDisplay transaction={transaction} />;
};
