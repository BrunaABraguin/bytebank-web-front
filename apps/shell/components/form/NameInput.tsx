import { Input } from "@bytebank-web/ui/input";
import { Label } from "@bytebank-web/ui/label";
import { Alert, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const NameInput = ({
  value,
  onChange,
  error,
  disabled = false,
}: NameInputProps) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="name">Nome</Label>
      <Input
        id="name"
        name="name"
        placeholder="Digite seu nome completo"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoComplete="name"
        aria-invalid={!!error}
        aria-describedby={error ? "name-error" : undefined}
      />
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircleIcon />
          <AlertTitle id="name-error">{error}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
