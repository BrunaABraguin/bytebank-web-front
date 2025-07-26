"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@workspace/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/select";
import { Input } from "@workspace/ui/input";
import { Label } from "@workspace/ui/label";
import { Button } from "@workspace/ui/button";
import { TransactionEnum } from "@workspace/types/transaction";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import { useSharedStore } from "@workspace/store";

export const TransactionForm = () => {
  const { mutate } = useAddTransaction();
  const { email } = useSharedStore();
  const [transactionType, setTransactionType] = useState<TransactionEnum>(
    TransactionEnum.INCOME
  );
  const [transactionValue, setTransactionValue] = useState<string>("");
  const transactionTypes = Object.values(TransactionEnum);

  function createTransaction(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (email) {
      const transaction = {
        type: transactionType,
        value: parseFloat(transactionValue),
        email,
      };
      mutate(transaction);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={createTransaction}>
          <DialogHeader>
            <DialogTitle>Registre uma transação</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para registrar uma nova transação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="transactionType">Tipo</Label>
              <Select
                onValueChange={(value) =>
                  setTransactionType(value as TransactionEnum)
                }
                defaultValue={transactionType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((transactionType: TransactionEnum) => (
                    <SelectItem key={transactionType} value={transactionType}>
                      {transactionType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transactionValue">Valor</Label>
              <Input
                id="transactionValue"
                name="transactionValue"
                placeholder="00.00"
                type="number"
                value={transactionValue}
                className="w-[180px]"
                onChange={(e) => setTransactionValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Registrar</Button>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
