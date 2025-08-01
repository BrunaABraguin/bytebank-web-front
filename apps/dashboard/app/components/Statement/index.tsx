"use client";
import React from "react";
import { Transaction } from "../Transaction";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { Loading } from "@bytebank-web/ui/loading";

interface StatementProps {
  transactions: TransactionType[] | undefined;
  isLoading: boolean;
}

export const Statement = ({ transactions, isLoading }: StatementProps) => {
  return (
    <Card className="col-span-1">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Últimas transações</h2>
        <div className="gap-9 h-80 overflow-auto">
          {isLoading ? (
            <Loading aria-label="Carregando transações" />
          ) : (
            transactions?.map((transaction, index) => (
              <Transaction
                key={transaction.value + index}
                transaction={transaction}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
