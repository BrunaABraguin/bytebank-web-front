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
import { Label } from "@bytebank-web/ui/label";
import { Button } from "@bytebank-web/ui/button";
import { Input } from "@bytebank-web/ui/input";
import { Loading } from "@bytebank-web/ui/loading";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Alert, AlertDescription, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

export const DialogLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, errorMessage, isPending, isSuccess } = useLogin(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete="email"
                    aria-invalid={!isEmailValid(email)}
                    aria-describedby="email-error"
                  />
                  {!isEmailValid(email) && email && (
                    <Alert variant="destructive" role="alert">
                      <AlertCircleIcon />
                      <AlertTitle id="email-error">
                        Por favor, insira um email válido.
                      </AlertTitle>
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
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    minLength={6}
                    autoComplete="current-password"
                    aria-invalid={password.length > 0 && password.length < 6}
                    aria-describedby="password-error"
                  />
                  {password.length > 0 && password.length < 6 && (
                    <Alert variant="destructive" role="alert">
                      <AlertCircleIcon />
                      <AlertTitle id="password-error">
                        A senha deve ter pelo menos 6 caracteres.
                      </AlertTitle>
                    </Alert>
                  )}
                </div>
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
                isPending ||
                !isEmailValid(email) ||
                password.length < 6 ||
                isSuccess
              }
              aria-disabled={
                isPending ||
                !isEmailValid(email) ||
                password.length < 6 ||
                isSuccess
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLogin(e);
                }
              }}
            >
              Acessar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
