import React from "react";
import { DialogRegister } from "./DialogRegister";
import { DialogLogin } from "./DialogLogin";

export const LoginButtons: React.FC = () => {
  return (
    <div className={`flex flex-wrap gap-4`}>
      <DialogRegister />
      <DialogLogin />
    </div>
  );
};
