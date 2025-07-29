import { TransactionsTable } from "./components/TransactionsTable";
import { Card, CardContent } from "@workspace/ui/card";

export default function Transactions() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}
