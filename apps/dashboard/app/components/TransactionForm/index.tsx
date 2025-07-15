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

export const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const transactionTypes = useAppSelector(
    (state) => state.transactionTypes.types
  );

  const dispatch = useAppDispatch();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="size-8">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione o tipo de transação</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionType">Tipo de Transação</Label>
              <Select>
                <SelectTrigger className="w-[180px] ml-4">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      onClick={() => setTransactionType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transactionValue">Valor da Transação</Label>
              <Input
                id="transactionValue"
                name="transactionValue"
                placeholder="00.00"
                type="number"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};
