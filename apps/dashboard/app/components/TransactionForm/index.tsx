"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
} from "@workspace/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/Select";
import { Input } from "@workspace/ui/Input";
import { Label } from "@workspace/ui/Label";
import { Button } from "@workspace/ui/Button";
import { TransactionEnum } from "@workspace/types/transaction";

export const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState<TransactionEnum>(
    TransactionEnum.INCOME
  );
  const [transactionValue, setTransactionValue] = useState<string>("");
  const transactionTypes = useAppSelector(
    (state) => state.transactionTypes.types
  );

  function createTransaction(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (transactionType && transactionValue) {
      dispatch({
        type: "transactions/addTransaction",
        payload: {
          type: transactionType,
          value: parseFloat(transactionValue),
        },
      });
      setTransactionType(TransactionEnum.INCOME);
      setTransactionValue("");
    }
  }

  const dispatch = useAppDispatch();

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
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionType">Tipo</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      onClick={() => setTransactionType(type as TransactionEnum)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
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
