"use client";
import React from "react";
import { Transaction } from "../Transaction";
import { Transaction as TransactionType } from "@workspace/types/transaction";

interface StatementProps {
  transactions: TransactionType[] | undefined;
}

export const Statement = ({ transactions }: StatementProps) => {
  return (
    <div className="bg-white rounded-lg p-8 w-[300px]">
      <div className="flex flex-col justify-between mb-4">
        <h2 className="text-xl font-bold">Extrato</h2>

        <div className="gap-9">
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
      </div>
    </div>
  );
};
