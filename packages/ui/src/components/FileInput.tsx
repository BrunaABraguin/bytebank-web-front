import { Label } from "../label";
import { Input } from "../input";

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
