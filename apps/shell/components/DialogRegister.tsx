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
import { Label } from "@bytebank-web/ui/label";
import { Button } from "@bytebank-web/ui/button";
import { Input } from "@bytebank-web/ui/input";
import { Alert, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import { isValidEmail } from "../utils/validateEmail";

export const DialogRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending, errorMessage, isSuccess } = useRegister();

  function validateForm() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Digite um email válido.";
    }
    if (!password.trim()) {
      newErrors.password = "A senha é obrigatória.";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    if (validateForm()) {
      mutate({ name, email, password });
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
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Digite seu nome completo"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                  />
                  {errors.name && (
                    <Alert variant="destructive">
                      <AlertCircleIcon className="mr-2" />
                      <AlertTitle id="name-error">{errors.name}</AlertTitle>
                    </Alert>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertCircleIcon className="mr-2" />
                      <p id="email-error" className="text-red-600 text-sm">
                        {errors.email}
                      </p>
                    </Alert>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertCircleIcon className="mr-2" />
                      <AlertTitle id="password-error">
                        {errors.password}
                      </AlertTitle>
                    </Alert>
                  )}
                </div>
              </>
            )}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircleIcon className="mr-2" />
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              size="lg"
              type="submit"
              className="bg-orange mt-5"
              disabled={isPending || isSuccess}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleRegister(e);
                }
              }}
            >
              Criar conta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
