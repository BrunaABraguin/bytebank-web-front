import { Button } from "@workspace/ui/Button";
import React from "react";

interface LoginButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "green" | "black";
}

export const LoginButtons: React.FC<LoginButtonsProps> = ({
  color = "green",
}) => {
  return (
    <div className={`flex flex-wrap gap-4`}>
      <Button color={color} className="hidden md:flex">
        <span className="hidden md:block">Abrir minha conta</span>
        <span className="block md:hidden">Abrir conta</span>
      </Button>
      <Button variant="secondary" color={color} className="hidden md:flex">
        Já tenho conta
      </Button>
    </div>
  );
};
