"use client";
import React, { useRef, useCallback } from "react";
import { Transaction } from "../Transaction";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";
import { Card, CardContent } from "@bytebank-web/ui/card";

interface StatementProps {
  transactions: TransactionType[] | undefined;
  hasMore?: boolean;
  loadMore?: () => void;
}

export const Statement = ({
  transactions,
  hasMore = false,
  loadMore,
}: StatementProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || !hasMore || !loadMore) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  return (
    <Card className="col-span-1">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Últimas transações</h2>
        <div
          ref={containerRef}
          className="gap-9 h-80 overflow-auto"
          onScroll={handleScroll}
        >
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
          {hasMore && (
            <div className="text-center text-gray-400 py-4">Carregando...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
