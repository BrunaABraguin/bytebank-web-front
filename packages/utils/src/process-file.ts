import { createHttpService } from "@bytebank-web/utils";
import { API_URL } from "./constants.js";

export const postProcessFile = async (
  file: File
): Promise<{ message: string; totalTransactions: number }> => {
  const formData = new FormData();
  formData.append("file", file);
  const client = createHttpService(API_URL, "multipart/form-data");
  const response = await client.post("api/process-file", formData);
  return {
    message: response.data.message,
    totalTransactions: response.data.totalTransactions,
  };
};
