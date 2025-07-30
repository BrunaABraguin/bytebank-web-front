import { Progress } from "@radix-ui/react-progress";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { ChartRadialText } from "@bytebank-web/ui/chartRadialText";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export const CategoriesChart = () => {
  const despesasPlanejadas = [
    { nome: "Cuidados Pess.", valor: 80, gasto: 80 },
    { nome: "Educação", valor: 100, gasto: 100 },
    { nome: "Extras", valor: 100, gasto: 100 },
    { nome: "Lazer", valor: 100, gasto: 100 },
    { nome: "Moradia", valor: 100, gasto: 100 },
    { nome: "Saúde", valor: 100, gasto: 100 },
    { nome: "Supermercado", valor: 100, gasto: 100 },
    { nome: "Transporte", valor: 100, gasto: 100 },
    { nome: "Vestuário", valor: 100, gasto: 100 },
  ];

  const categorias = [
    { nome: "Supermercado", percentual: 23.67 },
    { nome: "Moradia", percentual: 19.19 },
    { nome: "Transporte", percentual: 16.98 },
    { nome: "Educação", percentual: 5.85 },
    { nome: "Extras", percentual: 5.01 },
    { nome: "Saúde", percentual: 3.79 },
    { nome: "Cuidados Pess.", percentual: 2.87 },
    { nome: "Lazer", percentual: 2.26 },
    { nome: "Vestuário", percentual: 2.03 },
  ];

  const cartoes = [
    { nome: "Mastercard 4321", percentual: 6.87, valor: 100 },
    { nome: "Mastercard 4567", percentual: 61.67, valor: 655 },
    { nome: "Visa 1234", percentual: 9.22, valor: 98 },
    { nome: "Visa 7890", percentual: 8.09, valor: 80 },
  ];

  return (
    <>
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-gray-400">
            Cartões de Crédito
          </h2>
          <div className="flex gap-4">
            <ChartRadialText />
            <div className="flex flex-col w-1/2">
              {cartoes.map((item) => (
                <div key={item.nome} className="mb-2 h-10">
                  <div className="flex justify-between text-sm">
                    <span>{item.nome}</span>
                    <span>R$ {item.valor.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentual} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-gray-400">
            Despesas x Planejado
          </h2>
          {despesasPlanejadas.map((item) => (
            <div key={item.nome} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{item.nome}</span>
                <span>{item.gasto}%</span>
              </div>
              <Progress value={item.gasto} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-gray-400">
            % por Categoria
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categorias}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar
                  type="monotone"
                  dataKey="percentual"
                  stroke="#FF5031"
                  fill="#FF5031"
                  strokeWidth={3}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
