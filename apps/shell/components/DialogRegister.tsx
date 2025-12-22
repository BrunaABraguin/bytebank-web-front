"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@bytebank-web/ui/dialog";
import { Button } from "@bytebank-web/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { NameInput } from "./form/NameInput";
import { EmailInput } from "./form/EmailInput";
import { PasswordInput } from "./form/PasswordInput";

export const DialogRegister = () => {
  const { formData, errors, updateField, validateForm } = useRegisterForm();
  const { mutate, isPending, errorMessage, isSuccess } = useRegister();

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="hidden md:block">Abrir minha conta</span>
          <span className="block md:hidden">Abrir conta</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto">
        <DialogHeader>
          <Image
            src="/register.svg"
            alt="Computador Cadastrar Usuário"
            width={355}
            height={252}
            className="mx-auto"
            style={{ width: "auto", height: "auto" }}
          />
          <DialogTitle className="text-center">Cadastrar conta</DialogTitle>
          <DialogDescription className="text-center my-4">
            Preencha os campos abaixo para criar sua conta corrente!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRegister} noValidate>
          <div className="grid gap-4 mt-5">
            {isPending && <p className="text-center">Carregando...</p>}
            {isSuccess && (
              <Alert className="text-center text-green">
                <CheckCircle2Icon />
                Cadastro realizado com sucesso! Você será redirecionado.
              </Alert>
            )}
            {!isPending && !isSuccess && (
              <>
                <NameInput
                  value={formData.name}
                  onChange={(value) => updateField("name", value)}
                  error={errors.name}
                  disabled={isPending}
                />
                <EmailInput
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  error={errors.email}
                  disabled={isPending}
                  autoComplete="email"
                />
                <PasswordInput
                  value={formData.password}
                  onChange={(value) => updateField("password", value)}
                  error={errors.password}
                  disabled={isPending}
                  autoComplete="new-password"
                  placeholder="Crie uma senha (mín. 6 caracteres)"
                />
              </>
            )}
            {errorMessage && (
              <Alert variant="destructive" role="alert">
                <AlertCircleIcon />
                <AlertTitle>Erro no cadastro</AlertTitle>
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
                isPending ||
                !formData.name ||
                !formData.email ||
                !formData.password ||
                isSuccess
              }
            >
              Criar conta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
