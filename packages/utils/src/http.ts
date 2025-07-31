import axios from "axios";

export const createHttpService = (base?: string, contentType?: string) => {
  return axios.create({
    baseURL: base,
    headers: {
      "Content-Type": contentType || "application/json",
    },
    timeout: 180000, // 3 minutes
  });
};
