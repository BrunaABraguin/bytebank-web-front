import { Input } from "@bytebank-web/ui/input";
import { Label } from "@bytebank-web/ui/label";
import { Alert, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  error,
  disabled = false,
  autoComplete = "current-password",
  placeholder = "Digite sua senha",
}: PasswordInputProps) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="password">Senha</Label>
      <Input
        id="password"
        name="password"
        placeholder={placeholder}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        minLength={6}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? "password-error" : undefined}
      />
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircleIcon />
          <AlertTitle id="password-error">{error}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
