import { MonthlyData } from "@bytebank-web/types/monthlyData";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { AreaChartMonths } from "@bytebank-web/ui/areaChartMonths";

interface IncomeExpensesChartProps {
  transactions: MonthlyData[] | undefined;
}

export const IncomeExpensesChart = ({
  transactions,
}: IncomeExpensesChartProps) => {
  return (
    <Card className="col-span-3" aria-labelledby="income-expenses-title">
      <CardContent>
        <h2
          id="income-expenses-title"
          className="text-xl font-bold mb-4 text-gray-400"
        >
          Receitas e Despesas
        </h2>
        <AreaChartMonths
          transactions={transactions}
          aria-label="Gráfico de receitas e despesas mensais"
        />
      </CardContent>
    </Card>
  );
};
