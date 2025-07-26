"use client";
import Sidebar from "@workspace/ui/Sidebar";
import { NAV_LINKS } from "@workspace/utils/paths";
import { useSharedStore } from "@workspace/store";

import { Statement } from "./components/Statement";
import { AccountBalance } from "./components/AccountBalance";
import { IncomeExpensesChart } from "./components/IncomeExpensesChart";
import { useTransactions } from "./hooks/useTransactions";
import { useBalance } from "./hooks/useBalance";
import { useMonthlyChart } from "./hooks/useMonthlyChart";

export default function Dashboard() {
  const { email } = useSharedStore();
  const { transactions } = useTransactions(email);
  const { account } = useBalance(email);
  const { data } = useMonthlyChart(email);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Sidebar navLinks={NAV_LINKS} />
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <AccountBalance account={account} />
        <IncomeExpensesChart transactions={data} />
        <Statement transactions={transactions} />
      </div>
    </div>
  );
}
