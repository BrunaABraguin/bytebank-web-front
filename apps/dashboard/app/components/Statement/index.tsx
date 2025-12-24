"use client";
import React from "react";
import { Transaction } from "../Transaction";
import { Card, CardContent } from "@bytebank-web/ui/card";
import { Loading } from "@bytebank-web/ui/loading";
import { useSharedStore } from "@bytebank-web/store";
import { useTransactions } from "@bytebank-web/utils";
import { SquareArrowOutUpRight } from "lucide-react";
import { EmptyState, LoadingState } from "../StateComponents";

export const Statement = () => {
  const { email } = useSharedStore();
  const { transactions, isLoading } = useTransactions(email, 1, 20, undefined);

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
            <LoadingState className="flex justify-center items-center h-32">
              <Loading aria-label="Carregando transações" />
            </LoadingState>
          ) : (
            (() => {
              if (transactions?.length === 0) {
                return (
                  <EmptyState
                    message="Nenhuma transação encontrada."
                    className="text-gray-500 text-center h-32 flex items-center justify-center"
                  />
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
