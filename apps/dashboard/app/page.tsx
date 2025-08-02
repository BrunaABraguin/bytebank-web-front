"use client";

import { Statement } from "./components/Statement";
import { AccountBalance } from "./components/AccountBalance";
import { IncomeExpensesChart } from "./components/IncomeExpensesChart";
import { CategoriesChart } from "./components/CategoriesChart";
import { useSharedStore } from "@bytebank-web/store";
import { useState } from "react";

export default function Dashboard() {
   const { email } = useSharedStore();
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleMonthChange = (selectedMonth: number, selectedYear: number) => {
    setMonth(selectedMonth + 1);
    setYear(selectedYear);
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <AccountBalance ownerEmail={email} month={month} year={year} onMonthChange={handleMonthChange} />
        <IncomeExpensesChart />
        <Statement />
        <CategoriesChart ownerEmail={email} month={month} year={year} />
      </div>
    </div>
  );
}
