"use client";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@workspace/ui/Card";
import { MonthYearPicker } from "@workspace/ui/MonthYearPicker";
import { Progress } from "@workspace/ui/Progress";
import { AreaChartMonths } from "@workspace/ui/AreaChartMonths";
import { ChartRadialText } from "@workspace/ui/ChartRadialText";
import { Button } from "@workspace/ui/Button";
import Sidebar from "@workspace/ui/Sidebar";
import { NAV_LINKS } from "@workspace/utils/paths";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { FileUpload } from "@workspace/ui/FileUpload";
import { useUploadFile } from "./hooks/useUploadFile";
import { useEffect } from "react";

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

export default function Dashboard() {
  const { data, mutate } = useUploadFile();

  useEffect(() => {
    console.log("Upload response:", data);
  }, [data]);

  const handleFileChange = (file: File | null) => {
    mutate({
      email: "user@example.com",
      file,
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Sidebar navLinks={NAV_LINKS} />
      <div className="grid col-span-1 lg:col-span-4 gap-5">
        <Card className="col-span-4">
          <CardContent>
            <div className="flex md:flex-row md:items-center md:justify-between mb-2 gap-2">
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
                <FileUpload fileChange={handleFileChange} />
                <Button variant="outline" size="icon" className="size-8">
                  <Plus />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <SlidersHorizontal />
                </Button>
                <MonthYearPicker />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardContent>
            <h2 className="text-xl font-bold mb-4 text-gray-400">
              Receitas e Despesas
            </h2>
            <AreaChartMonths />
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
}
