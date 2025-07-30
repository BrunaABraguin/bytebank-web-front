"use client";
import { useSharedStore } from "@workspace/store";

import { Statement } from "./components/Statement";
import { AccountBalance } from "./components/AccountBalance";
import { IncomeExpensesChart } from "./components/IncomeExpensesChart";
import { useBalance } from "./hooks/useBalance";
import { useMonthlyChart } from "./hooks/useMonthlyChart";
import { useTransactions } from "@workspace/utils/use-transactions";

export default function Dashboard() {
  const { email } = useSharedStore();
  const { transactions } = useTransactions(email, 1, 10);
  const { account } = useBalance(email);
  const { data } = useMonthlyChart(email);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <AccountBalance account={account} />
        <IncomeExpensesChart transactions={data} />
        <Statement transactions={transactions} />
      </div>
    </div>
  );
}
