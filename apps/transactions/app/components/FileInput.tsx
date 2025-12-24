import { Label } from "@bytebank-web/ui/label";
import { Input } from "@bytebank-web/ui/input";

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = ({ onChange }: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="file-pdf">Arquivo PDF</Label>
      <Input
        id="file-pdf"
        type="file"
        accept="application/pdf"
        onChange={onChange}
      />
    </div>
  );
};
