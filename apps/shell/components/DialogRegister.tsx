"use client";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@workspace/ui/Dialog";
import { Label } from "@workspace/ui/Label";
import { Button } from "@workspace/ui/Button";
import { Input } from "@workspace/ui/Input";

export const DialogRegister = () => {
  function handleRegister() {}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="hidden md:block">Abrir minha conta</span>
          <span className="block md:hidden">Abrir conta</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto">
        <form onSubmit={handleRegister}>
          <DialogHeader>
            <Image
              src="/register.svg"
              alt="Computador Cadastrar Usuário"
              width={355}
              height={252}
              className="mx-auto"
            />
            <DialogTitle className="my-5">
              Preencha os campos abaixo para criar sua conta corrente!
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                type="string"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Digite seu email"
                type="string"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                placeholder="Digite sua senha"
                type="string"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orange">
              Criar conta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
