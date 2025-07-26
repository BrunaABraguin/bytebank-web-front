import { MonthlyData } from "@workspace/types/monthlyData";
import { AreaChartMonths } from "@workspace/ui/areaChartMonths";
import { Card, CardContent } from "@workspace/ui/card";

interface IncomeExpensesChartProps {
  transactions: MonthlyData[] | undefined;
}

export const IncomeExpensesChart = ({
  transactions,
}: IncomeExpensesChartProps) => {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-gray-400">
          Receitas e Despesas
        </h2>
        <AreaChartMonths transactions={transactions} />
      </CardContent>
    </Card>
  );
};
