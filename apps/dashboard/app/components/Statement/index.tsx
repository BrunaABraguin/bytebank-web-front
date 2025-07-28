"use client";
import React from "react";
import { Transaction } from "../Transaction";
import { Transaction as TransactionType } from "@workspace/types/transaction";
import { Card, CardContent } from "@workspace/ui/card";

interface StatementProps {
  transactions: TransactionType[] | undefined;
}

export const Statement = ({ transactions }: StatementProps) => {
  return (
    <Card className="col-span-1">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Últimas transações</h2>
        <div className="gap-9 h-full overflow-auto">
          {transactions?.length === 0 && (
            <div className="text-gray-500 text-center my-10 grid-cols-1">
              Nenhuma transação encontrada
            </div>
          )}
          {transactions?.map((transaction, index) => (
            <Transaction
              key={transaction.value + index}
              transaction={transaction}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
