import { Button } from "@workspace/ui/Button";
import React from "react";

export const LoginButtons: React.FC = () => {
  return (
    <div className={`flex flex-wrap gap-4`}>
      <Button>
        <span className="hidden md:block">Abrir minha conta</span>
        <span className="block md:hidden">Abrir conta</span>
      </Button>
      <Button variant="secondary">
        Já tenho conta
      </Button>
    </div>
  );
};
