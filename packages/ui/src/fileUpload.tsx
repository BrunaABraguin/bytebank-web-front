"use client";
import { useEffect, useState } from "react";
import { useProcessFile } from "@bytebank-web/utils/use-process-file";
import { useUploadFile } from "@bytebank-web/utils/use-upload-file";
import { useSharedStore } from "@bytebank-web/store";
import { Button } from "./button";
import { Upload } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Loading } from "./loading";

export const FileUpload = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [bank, setBank] = useState("itau");
  const { email } = useSharedStore();
  const { data, mutate, isPendingProcess } = useProcessFile();
  const { uploadMutate, isPending, isSuccess } = useUploadFile();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setMessage("");
    setBank("itau");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (file) {
      setFile(null);
      setMessage("");
    }
    if (e.target.files?.length) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo.");
      return;
    }
    if (!email) {
      setMessage("Email não encontrado.");
      return;
    }
    setMessage("Enviando arquivo...");
    uploadMutate({ email, file });
    setFile(null);
    setMessage("");
  };

  const handleProcessFile = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo.");
      return;
    }
    if (!email) {
      setMessage("Email não encontrado.");
      return;
    }
    setMessage("Enviando arquivo...");
    mutate({ file });
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envie seu arquivo</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para enviar um novo arquivo. Seu arquivo
            será pré-processado e os resultados serão apresentados. Apenas
            arquivos PDF são aceitos. Certifique-se de que o arquivo contém
            transações válidas. Máximo de 20 transações serão processadas.
          </DialogDescription>
        </DialogHeader>
        {isPending && <Loading aria-label="Enviando arquivo" />}
        <div className="flex flex-col gap-3 space-y-2">
          <div className="flex flex-col gap-2">
            <Label>Banco</Label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="itau">Itaú</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="file-pdf">Arquivo PDF</Label>
            <Input
              id="file-pdf"
              type="file"
              accept="application/pdf"
              onChange={handleChange}
            />
          </div>
          {message && <p>{message}</p>}
          {data && file && (
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Deseja processar o arquivo? Foram encontradas{" "}
              <strong>{data.totalTransactions}</strong> transações. Máximo de 20
              transações serão processadas.
            </p>
          )}
        </div>
        <DialogFooter>
          {data && !isPending && !isPendingProcess ? (
            <Button
              type="submit"
              onClick={handleUpload}
              disabled={isPending || isPendingProcess}
            >
              Processar arquivo ({data.totalTransactions} transações)
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleProcessFile}
              disabled={isPendingProcess || isPending}
            >
              Enviar arquivo
            </Button>
          )}
          <DialogClose asChild onClick={handleClose}>
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
