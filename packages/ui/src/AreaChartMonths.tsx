import { XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { ChartConfig, ChartContainer } from "./Chart";

export const AreaChartMonths = () => {
  const dadosMensais = [
    { month: "Janeiro", income: 0, expense: 0 },
    { month: "Fevereiro", income: 0, expense: 0 },
    { month: "Março", income: 11290, expense: 8322.45 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-full w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart data={dadosMensais}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#47A138" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B6E2B2" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5031" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFD2C9" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            name="Receita"
            stroke="#47A138"
            fill="url(#incomeGradient)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="Despesa"
            stroke="#FF5031"
            fill="url(#expenseGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
