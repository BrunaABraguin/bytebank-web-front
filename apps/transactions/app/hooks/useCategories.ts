import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
