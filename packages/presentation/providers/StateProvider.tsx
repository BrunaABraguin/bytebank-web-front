"use client";

import { useEffect } from "react";
import { DIContainer } from "@bytebank-web/shared";

interface StateProviderProps {
  children: React.ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
  useEffect(() => {
    try {
      DIContainer.init();
      console.log("DI Container inicializado com sucesso");
    } catch (error) {
      console.warn("Erro ao inicializar DI Container:", error);
    }
  }, []);

  return <>{children}</>;
}
