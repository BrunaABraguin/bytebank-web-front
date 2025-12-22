import { useState, useCallback } from "react";

interface UseTablePaginationProps {
  initialPageSize?: number;
  initialPageIndex?: number;
}

export function useTablePagination({
  initialPageSize = 10,
  initialPageIndex = 0,
}: UseTablePaginationProps = {}) {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  const updatePagination = useCallback(
    (updater: any) => {
      let newPagination;
      if (typeof updater === "function") {
        newPagination = updater({ pageIndex, pageSize });
      } else {
        newPagination = updater;
      }
      setPageIndex(newPagination.pageIndex ?? 0);
      setPageSize(newPagination.pageSize ?? 10);
    },
    [pageIndex, pageSize]
  );

  const goToNextPage = useCallback(() => {
    setPageIndex((prev) => prev + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const resetPagination = useCallback(() => {
    setPageIndex(initialPageIndex);
    setPageSize(initialPageSize);
  }, [initialPageIndex, initialPageSize]);

  return {
    pageSize,
    pageIndex,
    setPageSize,
    setPageIndex,
    updatePagination,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    paginationState: { pageIndex, pageSize },
  };
}
