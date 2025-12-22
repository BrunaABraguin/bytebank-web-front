import { useCategoriesChart } from "@/hooks/useCategoriesChart";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { Loading } from "@bytebank-web/ui/loading";
import { EmptyState, LoadingState } from "../StateComponents";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface CategoriesChartProps {
  ownerEmail: string | null;
  month: number;
  year: number;
}

export const CategoriesChart = ({
  ownerEmail,
  month,
  year,
}: CategoriesChartProps) => {
  const { data: categories, isLoading } = useCategoriesChart(
    ownerEmail,
    month,
    year
  );

  return (
    <Card className="col-span-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-gray-400">
          % de despesas/transferências por Categoria
        </h2>
        <div className="h-64">
          {(() => {
            if (isLoading) {
              return (
                <LoadingState>
                  <Loading />
                </LoadingState>
              );
            }

            if (categories?.length === 0) {
              return <EmptyState message="Nenhum dado disponível." />;
            }

            return (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categories}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value ? `${value}%` : "0%"
                    }
                  />
                  <Bar
                    type="monotone"
                    dataKey="percentage"
                    name="Percentual"
                    stroke="#FF5031"
                    fill="#FF5031"
                    strokeWidth={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            );
          })()}
        </div>
      </CardContent>
    </Card>
  );
};
