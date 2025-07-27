"use client";
import { useState } from "react";

interface FileUploadProps {
  fileChange(file: File | null): void;
}

export const FileUpload = ({ fileChange }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo.");
      return;
    }
    fileChange(file);
    setMessage("");
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {"Enviar"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};
