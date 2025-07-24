import axios from "axios";

export const createHttpService = (apiUrl: string, contentType?: string) => {
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": contentType || "application/json",
    },
  });
};
