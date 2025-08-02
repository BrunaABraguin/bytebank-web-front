import { Card, CardContent } from "@bytebank-web/ui/card";
import { AreaChartMonths } from "@bytebank-web/ui/areaChartMonths";
import { useSharedStore } from "@bytebank-web/store";
import { useMonthlyChart } from "@/hooks/useMonthlyChart";

export const IncomeExpensesChart = () => {
  const { email } = useSharedStore();
  const { data, isLoading } = useMonthlyChart(email);

  return (
    <Card className="col-span-3" aria-labelledby="income-expenses-title">
      <CardContent>
        <h2
          id="income-expenses-title"
          className="text-xl font-bold mb-4 text-gray-400"
        >
          Receitas e Despesas
        </h2>
        {(() => {
          if (isLoading) {
            return (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Carregando gráfico...</p>
              </div>
            );
          }

          if (data?.length === 0) {
            return (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Nenhum dado disponível.</p>
              </div>
            );
          }

          return (
            <AreaChartMonths
              transactions={data}
              aria-label="Gráfico de receitas e despesas mensais"
            />
          );
        })()}
      </CardContent>
    </Card>
  );
};
