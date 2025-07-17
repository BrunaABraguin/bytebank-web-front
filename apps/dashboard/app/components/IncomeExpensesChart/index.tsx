import { AreaChartMonths } from "@workspace/ui/AreaChartMonths";
import { Card, CardContent } from "@workspace/ui/Card";

export const IncomeExpensesChart = () => {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-gray-400">
          Receitas e Despesas
        </h2>
        <AreaChartMonths />
      </CardContent>
    </Card>
  );
};
