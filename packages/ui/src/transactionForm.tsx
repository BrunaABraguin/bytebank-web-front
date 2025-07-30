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
} from "@bytebank-web/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bytebank-web/ui/select";
import { Input } from "@bytebank-web/ui/input";
import { Label } from "@bytebank-web/ui/label";
import { Button } from "@bytebank-web/ui/button";
import { TransactionEnum } from "@bytebank-web/types/transaction";
import { useAddTransaction } from "@bytebank-web/utils/use-add-transaction";
import { useSharedStore } from "@bytebank-web/store";

export const TransactionForm = () => {
  const { mutate } = useAddTransaction();
  const { email } = useSharedStore();
  const [open, setOpen] = useState(false);
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
      setTransactionValue("");
      setTransactionType(TransactionEnum.INCOME);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
