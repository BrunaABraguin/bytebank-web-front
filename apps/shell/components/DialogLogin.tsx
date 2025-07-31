"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@bytebank-web/ui/dialog";
import { Label } from "@bytebank-web/ui/label";
import { Button } from "@bytebank-web/ui/button";
import { Input } from "@bytebank-web/ui/input";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export const DialogLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, errorMessage, isPending } = useLogin(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Já tenho conta</Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto">
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <Image
              src="/login.svg"
              alt="Computador Login Usuário"
              width={334}
              height={267}
              className="mx-auto my-auto"
            />
            <DialogTitle className="text-center my-5">Login</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            {isPending ? (
              <p className="text-center">Carregando...</p>
            ) : (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
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
                  />
                </div>
              </>
            )}
            {errorMessage && (
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-red-600">
                {errorMessage}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              size="lg"
              type="submit"
              className="bg-green mt-5"
              disabled={isPending}
            >
              Acessar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
