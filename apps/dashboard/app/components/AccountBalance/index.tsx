import { Card, CardContent } from "@workspace/ui/card";
import { Account } from "@workspace/types/account";
import { TransactionForm } from "@workspace/ui/transactionForm";

interface AccountBalanceProps {
  account: Account | undefined;
}

export const AccountBalance = ({ account }: AccountBalanceProps) => {
  return (
    <Card className="col-span-4">
      <CardContent>
        <div className="flex md:flex-row md:items-center md:justify-between mb-2 gap-2">
          <div className="flex justify-between text-lg gap-8">
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Saldo</span>
              <span>R$ {account?.balance.toLocaleString()}</span>
            </div>
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Receita</span>
              <span>R$ {account?.income.toLocaleString()}</span>
            </div>
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Despesas</span>
              <span>R$ {account?.expense.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <TransactionForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
