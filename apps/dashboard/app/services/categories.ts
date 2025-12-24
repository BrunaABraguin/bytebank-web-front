import { createHttpService } from "@bytebank-web/utils";
import { API_URL } from "@/constants";
import { CategoryData } from "@bytebank-web/types/categoryData";

export interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const client = createHttpService(API_URL);
  const response = await client.get("/api/categories");
  return response.data;
};

export const getCategoriesData = async (
  ownerEmail: string | null,
  month: number,
  year: number
): Promise<CategoryData[]> => {
  const client = createHttpService(API_URL);

  const response = await client.get("/api/categories-data", {
    params: { email: ownerEmail, month, year },
  });
  return response.data;
};
