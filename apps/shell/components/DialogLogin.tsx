"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@bytebank-web/ui/dialog";
import { Button } from "@bytebank-web/ui/button";
import { Loading } from "@bytebank-web/ui/loading";
import { useLogin } from "../hooks/useLogin";
import { useLoginForm } from "../hooks/useLoginForm";
import { Alert, AlertDescription, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { EmailInput } from "./form/EmailInput";
import { PasswordInput } from "./form/PasswordInput";

export const DialogLogin = () => {
  const { formData, errors, updateField, validateForm } = useLoginForm();
  const { mutate, errorMessage, isPending, isSuccess } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label="Abrir diálogo de login">
          Já tenho conta
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-full overflow-y-auto"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <Image
            src="/login.svg"
            alt="Ilustração de um computador com login de usuário"
            width={334}
            height={267}
            className="mx-auto my-auto"
          />
          <DialogTitle className="text-center my-5">Login</DialogTitle>
          <DialogDescription className="text-center">
            Faça login para acessar sua conta e aproveitar todos os recursos do
            ByteBank.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} noValidate>
          <div className="grid gap-4 mt-5">
            {isPending && <Loading />}
            {isSuccess && (
              <Alert className="text-center text-green">
                <CheckCircle2Icon />
                Login realizado com sucesso! Você será redirecionado.
              </Alert>
            )}
            {!isPending && !isSuccess && (
              <>
                <EmailInput
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  error={errors.email}
                  disabled={isPending}
                />
                <PasswordInput
                  value={formData.password}
                  onChange={(value) => updateField("password", value)}
                  error={errors.password}
                  disabled={isPending}
                />
              </>
            )}
            {errorMessage && (
              <Alert variant="destructive" role="alert">
                <AlertCircleIcon />
                <AlertTitle>Erro ao fazer login</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              size="lg"
              type="submit"
              className="bg-green mt-5"
              disabled={
                isPending || !formData.email || !formData.password || isSuccess
              }
            >
              Acessar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
