
import { useMutation } from "@tanstack/react-query";
import { postProcessFile } from "./process-file.js";

export const useProcessFile = () => {
  const { data, mutate, isPending: isPendingProcess } = useMutation({
    mutationKey: ["processFile"],
    mutationFn: async ({ file }: { file: File | null }) => {
      if (!file) throw new Error("No file selected");
      return postProcessFile(file);
    },
  });
  return { data, mutate, isPendingProcess };
};
