import { Input } from "@bytebank-web/ui/input";
import { Label } from "@bytebank-web/ui/label";
import { Alert, AlertTitle } from "@bytebank-web/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const EmailInput = ({
  value,
  onChange,
  error,
  disabled = false,
  autoComplete = "email",
}: EmailInputProps) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        placeholder="Digite seu email"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircleIcon />
          <AlertTitle id="email-error">{error}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
