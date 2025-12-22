import { Card, CardContent } from "@bytebank-web/ui/card";
import { AreaChartMonths } from "@bytebank-web/ui/areaChartMonths";
import { useSharedStore } from "@bytebank-web/store";
import { useMonthlyChart } from "@/hooks/useMonthlyChart";
import { Loading } from "@bytebank-web/ui/loading";
import { EmptyState, LoadingState } from "../StateComponents";

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
              <LoadingState>
                <Loading />
              </LoadingState>
            );
          }

          if (data?.length === 0) {
            return <EmptyState message="Nenhum dado disponível." />;
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
