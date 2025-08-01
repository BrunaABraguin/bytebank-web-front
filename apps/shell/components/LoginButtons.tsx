import React from "react";
import { DialogRegister } from "./DialogRegister";
import { DialogLogin } from "./DialogLogin";

export const LoginButtons: React.FC = () => {
  return (
    <fieldset
      className={`flex flex-wrap gap-4`}
      aria-label="Opções de Login e Cadastro"
    >
      <DialogRegister />
      <DialogLogin />
    </fieldset>
  );
};
