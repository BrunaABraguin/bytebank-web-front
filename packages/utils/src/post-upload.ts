import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "./contants.js";

export const postUpload = async (
  email: string,
  file: File
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);
  const client = createHttpService(API_URL, "multipart/form-data");
  const response = await client.post("api/upload", formData);
  return { message: response.data.message };
};
