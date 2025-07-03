"use client";
import { Card } from "@repo/ui/Card";
import { CardContent } from "@repo/ui/CardContent";
import { Progress } from "@repo/ui/Progress";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const receita = 11290;
const despesas = 8322.45;
const saldo = receita - despesas;
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

const dadosMensais = [
  { mes: "Jan", receita: 9500, despesas: 7100 },
  { mes: "Fev", receita: 10200, despesas: 8000 },
  { mes: "Mar", receita: 11290, despesas: 8322.45 },
];

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Receitas e Despesas</h2>
          <div className="flex justify-between text-lg mb-2">
            <div className="text-green-600">R$ {receita.toLocaleString()}</div>
            <div className="text-red-600">R$ {despesas.toLocaleString()}</div>
            <div className="text-emerald-700">R$ {saldo.toLocaleString()}</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosMensais}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke="#47A138"
                  fill="#47A138"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="despesas"
                  stroke="#FF5031"
                  fill="#FF5031"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Cartões de Crédito</h2>
          {cartoes.map((item) => (
            <div key={item.nome} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{item.nome}</span>
                <span>R$ {item.valor.toLocaleString()}</span>
              </div>
              <Progress value={item.percentual} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Despesas x Planejado</h2>
          {despesasPlanejadas.map((item) => (
            <div key={item.nome} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{item.nome}</span>
                <span>{item.gasto}%</span>
              </div>
              <Progress value={item.gasto} className="h-2" />
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-orange-200"
                  strokeWidth="4"
                  fill="none"
                  stroke="currentColor"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-orange-500"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="74, 100"
                  stroke="currentColor"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                74%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">% por Categoria</h2>
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
    </div>
  );
}
