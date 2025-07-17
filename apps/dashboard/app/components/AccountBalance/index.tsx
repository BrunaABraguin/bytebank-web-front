import { Card, CardContent } from "@workspace/ui/Card";
import { MonthYearPicker } from "@workspace/ui/MonthYearPicker";
import { TransactionForm } from "../TransactionForm";
import { useAppSelector } from "@/store/hooks";
import {
  selectCurrentBalance,
  selectExpenses,
  selectIncome,
} from "@/features/transactions/transactionsSlice";
import { useState } from "react";

export const AccountBalance = () => {
  const [selectedDate, setSelectedDate] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const balance = useAppSelector((state) => selectCurrentBalance(state));
  const income = useAppSelector(
    selectIncome(selectedDate.month, selectedDate.year)
  );
  const expenses = useAppSelector(
    selectExpenses(selectedDate.month, selectedDate.year)
  );

  return (
    <Card className="col-span-4">
      <CardContent>
        <div className="flex md:flex-row md:items-center md:justify-between mb-2 gap-2">
          <div className="flex justify-between text-lg gap-8">
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Saldo</span>
              <span>R$ {balance.toLocaleString()}</span>
            </div>
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Receita</span>
              <span>R$ {income.toLocaleString()}</span>
            </div>
            <div className="grid font-semibold">
              <span className="text-sm text-gray-500">Despesas</span>
              <span>R$ {expenses.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <TransactionForm />
            <MonthYearPicker onChange={setSelectedDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
