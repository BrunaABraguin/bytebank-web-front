import { useState, useCallback } from "react";
import { TransactionEnum } from "@bytebank-web/types/transaction";

export function useTransactionFilters() {
  const [typeFilter, setTypeFilter] = useState<TransactionEnum | "">("");
  const [searchFilter, setSearchFilter] = useState("");

  const updateTypeFilter = useCallback((type: TransactionEnum | "") => {
    setTypeFilter(type);
  }, []);

  const updateSearchFilter = useCallback((search: string) => {
    setSearchFilter(search);
  }, []);

  const clearFilters = useCallback(() => {
    setTypeFilter("");
    setSearchFilter("");
  }, []);

  const hasActiveFilters = useCallback(() => {
    return typeFilter !== "" || searchFilter !== "";
  }, [typeFilter, searchFilter]);

  return {
    typeFilter,
    searchFilter,
    updateTypeFilter,
    updateSearchFilter,
    clearFilters,
    hasActiveFilters,
  };
}
