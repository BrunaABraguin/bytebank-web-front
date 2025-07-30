
import { useMutation } from "@tanstack/react-query";
import { postUpload } from "./post-upload.js";

export const useUploadFile = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async ({ email, file }: { email: string; file: File | null }) => {
      if (!file) throw new Error("No file selected");
      return postUpload(email, file);
    },
  });
  return { data, mutate };
};
