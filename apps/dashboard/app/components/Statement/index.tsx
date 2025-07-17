"use client";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Transaction } from "../Transaction";
import { RootState } from "@/store";

export const Statement = () => {
  const transactions = useAppSelector(
    (state: RootState) => state.transactions.data
  );

  console.log("Transactions:", transactions);

  return (
    <div className="bg-white rounded-lg p-8 md:col-span-1">
      <div className="flex flex-col justify-between mb-4">
        <h2 className="text-xl font-bold">Extrato</h2>

        <div className="flex flex-col gap-9">
          {!transactions.length && (
            <div className="text-gray-500 text-center my-10">
              Nenhuma transação encontrada
            </div>
          )}
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};
