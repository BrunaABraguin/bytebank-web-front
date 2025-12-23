"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import { Button } from "@bytebank-web/ui/button";
import { useAddTransaction } from "@bytebank-web/utils";
import { useTransactionForm } from "./hooks/useTransactionForm";
import {
  TransactionValidator,
  TransactionFactory,
} from "./services/transactionService";
import { TransactionTypeSelector } from "./components/TransactionTypeSelector";
import { TransactionValueInput } from "./components/TransactionValueInput";

interface TransactionFormProps {
  userEmail: string;
}

export const TransactionForm = ({ userEmail }: TransactionFormProps) => {
  const { mutate, isSuccess, isPending } = useAddTransaction();
  const [open, setOpen] = useState(false);
  const {
    transactionType,
    setTransactionType,
    transactionValue,
    setTransactionValue,
    errors,
    setErrors,
    resetForm,
  } = useTransactionForm();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      resetForm();
    }
  }, [isSuccess, resetForm]);

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const validationErrors =
      TransactionValidator.validateForm(transactionValue);
    setErrors(validationErrors);

    if (!TransactionValidator.isFormValid(validationErrors)) return;

    if (userEmail) {
      const transaction = TransactionFactory.createTransaction(
        transactionType,
        transactionValue,
        userEmail
      );
      mutate(transaction);
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
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>Registre uma transação</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para registrar uma nova transação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <TransactionTypeSelector
              value={transactionType}
              onValueChange={setTransactionType}
              disabled={isPending}
            />
            <TransactionValueInput
              value={transactionValue}
              onValueChange={setTransactionValue}
              error={errors.transactionValue}
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-5"
              disabled={!userEmail || isPending || !transactionValue}
            >
              Registrar
            </Button>
            <DialogClose asChild className="mt-5" disabled={isPending}>
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
