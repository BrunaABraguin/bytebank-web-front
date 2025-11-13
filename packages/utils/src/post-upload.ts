import { createHttpService } from "@bytebank-web/utils/http";
import { API_URL } from "./constants.js";

export const postUploadFile = async (
  email: string,
  file: File
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const client = createHttpService(API_URL, "multipart/form-data");
  const response = await client.post("api/upload", formData, {
    params: {
      email,
    },
  });
  return { message: response.data.message };
};
