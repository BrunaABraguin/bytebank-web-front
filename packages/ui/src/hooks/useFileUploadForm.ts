import { useState, useEffect, useCallback } from "react";
import { useProcessFile } from "@bytebank-web/utils/use-process-file";
import { useUploadFile } from "@bytebank-web/utils/use-upload-file";

// Hook para gerenciar estado do upload de arquivo
export function useFileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [bank, setBank] = useState("itau");
  const { data, mutate, isPendingProcess } = useProcessFile();
  const { uploadMutate, isPending, isSuccess } = useUploadFile();

  const resetForm = useCallback(() => {
    setFile(null);
    setMessage("");
    setBank("itau");
  }, []);

  return {
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
  };
}
