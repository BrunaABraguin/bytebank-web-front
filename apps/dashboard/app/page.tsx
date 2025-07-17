"use client";
import Sidebar from "@workspace/ui/Sidebar";
import { NAV_LINKS } from "@workspace/utils/paths";

import { Statement } from "./components/Statement";
import { AccountBalance } from "./components/AccountBalance";
import { IncomeExpensesChart } from "./components/IncomeExpensesChart";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Sidebar navLinks={NAV_LINKS} />
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <AccountBalance />
        <IncomeExpensesChart />
        <Statement />
      </div>
    </div>
  );
}
