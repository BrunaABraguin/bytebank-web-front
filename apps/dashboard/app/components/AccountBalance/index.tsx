import { Card, CardContent } from "@workspace/ui/Card";
import { MonthYearPicker } from "@workspace/ui/MonthYearPicker";
import { TransactionForm } from "../TransactionForm";
import { useDashboardStore } from "@/stores/dashboardStore";

export const AccountBalance = () => {
  const balance = useDashboardStore((state) => state.balance);
  const income = useDashboardStore((state) => state.income);
  const expenses = useDashboardStore((state) => state.expenses);

  const setSelectedDate = (month: number, year: number) => {
    useDashboardStore.setState({ month, year });
  };

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
