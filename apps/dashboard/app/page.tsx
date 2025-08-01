"use client";
import { useSharedStore } from "@bytebank-web/store";

import { Statement } from "./components/Statement";
import { AccountBalance } from "./components/AccountBalance";
import { IncomeExpensesChart } from "./components/IncomeExpensesChart";
import { useBalance } from "./hooks/useBalance";
import { useMonthlyChart } from "./hooks/useMonthlyChart";
import { useTransactions } from "@bytebank-web/utils/use-transactions";

export default function Dashboard() {
  const { email } = useSharedStore();
  const { transactions, isLoading } = useTransactions(email, 1, 20);
  const { account, isLoadingAccount } = useBalance(email);
  const { data } = useMonthlyChart(email);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <AccountBalance account={account} isLoading={isLoadingAccount} />
        <IncomeExpensesChart transactions={data} />
        <Statement transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
}
