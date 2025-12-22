"use client";
import { useEffect, useState } from "react";
import { useSharedStore } from "@bytebank-web/store";
import { useFileUploadForm } from "./hooks/useFileUploadForm";
import { FileProcessor } from "./services/fileService";
import { BankSelector } from "./components/BankSelector";
import { FileInput } from "./components/FileInput";
import { ProcessFileButton } from "./components/ProcessFileButton";
import { Button } from "./button";
import { Upload } from "lucide-react";
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
import { Loading } from "./loading";

export const FileUpload = () => {
  const [open, setOpen] = useState(false);
  const { email } = useSharedStore();
  const {
    file,
    setFile,
    message,
    setMessage,
    bank,
    setBank,
    data,
    mutate,
    isPendingProcess,
    uploadMutate,
    isPending,
    isSuccess,
    resetForm,
  } = useFileUploadForm();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      resetForm();
    }
  }, [isSuccess, resetForm]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (file) {
      resetForm();
    }
    if (e.target.files?.length) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecione um arquivo antes de processar.");
      return;
    }

    try {
      setMessage("Enviando arquivo...");
      await FileProcessor.uploadFile(file!, email!, uploadMutate);
      setFile(null);
      setMessage("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Erro ao fazer upload"
      );
    }
  };

  const handleProcessFile = async () => {
    if (!file) {
      setMessage("Selecione um arquivo antes de processar.");
      return;
    }

    try {
      setMessage("Enviando arquivo...");
      await FileProcessor.processFile(file!, mutate);
      setMessage("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Erro ao processar arquivo"
      );
    }
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
          <BankSelector value={bank} onValueChange={setBank} />
          <FileInput onChange={handleFileChange} />
          {message && <p>{message}</p>}
          {data && file && (
            <p className="leading-7 not-first:mt-6">
              Deseja processar o arquivo? Foram encontradas{" "}
              <strong>{data.totalTransactions}</strong> transações. Máximo de 20
              transações serão processadas.
            </p>
          )}
        </div>
        <DialogFooter>
          <ProcessFileButton
            hasData={!!data}
            hasFile={!!file}
            isPending={isPending}
            isPendingProcess={isPendingProcess}
            totalTransactions={data?.totalTransactions}
            onUpload={handleUpload}
            onProcess={handleProcessFile}
          />
          <DialogClose
            asChild
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
