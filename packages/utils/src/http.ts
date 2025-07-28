import axios from "axios";

export const createHttpService = (contentType?: string) => {
  return axios.create({
    baseURL: `${process.env.API_URL}`,
    headers: {
      "Content-Type": contentType || "application/json",
    },
  });
};
