import { useMutation } from "@tanstack/react-query";
import { postUploadFile } from "./post-upload.js";
import { queryClient } from "./react-query.js";

export const useUploadFile = () => {
  const {
    data,
    mutate: uploadMutate,
    isPending,
  } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async ({
      email,
      file,
    }: {
      email: string;
      file: File | null;
    }) => {
      if (!file) throw new Error("No file selected");
      return postUploadFile(email, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  return { data, uploadMutate, isPending };
};
