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
const poupança = receita * 0.1;
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
      <Card className="col-span-1 lg:col-span-2">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
            <div className="flex justify-between text-lg gap-8">
              <div className="grid font-semibold">
                <span className="text-sm text-gray-500">Saldo</span>
                <span>R$ {saldo.toLocaleString()}</span>
              </div>
              <div className="grid font-semibold">
                <span className="text-sm text-gray-500">Receita</span>
                <span>R$ {receita.toLocaleString()}</span>
              </div>
              <div className="grid font-semibold">
                <span className="text-sm text-gray-500">Despesas</span>
                <span>R$ {despesas.toLocaleString()}</span>
              </div>
              <div className="grid font-semibold">
                <span className="text-sm text-gray-500">Poupança</span>
                <span>R$ {poupança.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="border rounded px-2 py-1 text-sm"
                defaultValue="Mar"
              >
                <option value="Jan">Janeiro</option>
                <option value="Fev">Fevereiro</option>
                <option value="Mar">Março</option>
              </select>
              <select
                className="border rounded px-2 py-1 text-sm"
                defaultValue="2024"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-400">
            Receitas e Despesas
          </h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosMensais}>
                <defs>
                  <linearGradient
                    id="receitaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#47A138" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B6E2B2" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="despesasGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#FF5031" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD2C9" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke="#47A138"
                  fill="url(#receitaGradient)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="despesas"
                  stroke="#FF5031"
                  fill="url(#despesasGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-400">
            Cartões de Crédito
          </h2>
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

      <Card>
        <CardContent className="p-4">
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
    </div>
  );
}
