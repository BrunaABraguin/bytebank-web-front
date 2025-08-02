"use client";
import React from "react";
import { Transaction } from "../Transaction";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { Loading } from "@bytebank-web/ui/loading";
import { useSharedStore } from "@bytebank-web/store";
import { useTransactions } from "@bytebank-web/utils/use-transactions";
import { SquareArrowOutUpRight } from "lucide-react";

export const Statement = () => {
  const { email } = useSharedStore();
  const { transactions, isLoading } = useTransactions(email, 1, 20);

  return (
    <Card className="col-span-1">
      <CardContent>
        <div className="flex justify-between items-center text-center mb-4">
          <h2 className="text-xl font-bold">Últimas transações</h2>
          <a href="/transactions">
            <SquareArrowOutUpRight size={16} />
          </a>
        </div>
        <div className="gap-9 h-80 overflow-auto">
          {isLoading ? (
            <Loading aria-label="Carregando transações" />
          ) : (
            (() => {
              if (transactions?.length === 0) {
                return (
                  <p className="text-gray-500 text-center">
                    Nenhuma transação encontrada.
                  </p>
                );
              }
              return transactions?.map((transaction, index) => (
                <Transaction
                  key={(transaction._id ?? "unknown") + index}
                  transaction={transaction}
                />
              ));
            })()
          )}
        </div>
      </CardContent>
    </Card>
  );
};
