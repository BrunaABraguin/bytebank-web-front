import { Transaction } from "./components/ColumnsTable";
import { TransactionsTable } from "./components/TransactionsTable";
import { Card, CardContent } from "@workspace/ui/card";

async function getData(): Promise<Transaction[]> {
  return [
    {
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Trabalho",
    },
    {
      id: "2",
      description: "Supermercado",
      amount: -300,
      type: "expense",
      category: "Alimentação",
    },
    {
      id: "3",
      description: "Cinema",
      amount: -150,
      type: "expense",
      category: undefined,
    },
    {
      id: "4",
      description: "Freelance",
      amount: 2000,
      type: "income",
      category: "Trabalho",
    },
  ];
}

export default async function Transactions() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <TransactionsTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
