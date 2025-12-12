"use client";

import { useState, useEffect, useCallback } from "react";

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
}

interface UseErrorHandlerOptions {
  onError?: (error: ErrorInfo) => void;
  enableLogging?: boolean;
  maxErrors?: number;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { onError, enableLogging = true, maxErrors = 10 } = options;
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [hasError, setHasError] = useState(false);

  const logError = useCallback(
    (error: ErrorInfo) => {
      if (enableLogging) {
        console.error("Error captured:", error);

        
        if (
          typeof globalThis !== "undefined" &&
          globalThis.process?.env?.NODE_ENV === "development"
        ) {
          console.group("🚨 Error Details");
          console.error("Message:", error.message);
          console.error("Timestamp:", new Date(error.timestamp).toISOString());
          if (error.stack) console.error("Stack:", error.stack);
          if (error.componentStack)
            console.error("Component Stack:", error.componentStack);
          console.groupEnd();
        }
      }
    },
    [enableLogging]
  );

  const captureError = useCallback(
    (error: Error | string, componentStack?: string) => {
      const errorInfo: ErrorInfo = {
        message: typeof error === "string" ? error : error.message,
        stack: typeof error === "object" ? error.stack : undefined,
        componentStack,
        timestamp: Date.now(),
      };

      setErrors((prev) => {
        const newErrors = [errorInfo, ...prev].slice(0, maxErrors);
        return newErrors;
      });

      setHasError(true);
      logError(errorInfo);
      onError?.(errorInfo);
    },
    [logError, onError, maxErrors]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
    setHasError(false);
  }, []);

  const clearError = useCallback(
    (index: number) => {
      setErrors((prev) => prev.filter((_, i) => i !== index));
      if (errors.length <= 1) {
        setHasError(false);
      }
    },
    [errors.length]
  );

  
  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      captureError(event.error || event.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      captureError(event.reason || "Unhandled promise rejection");
    };

    globalThis.addEventListener("error", handleUnhandledError);
    globalThis.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      globalThis.removeEventListener("error", handleUnhandledError);
      globalThis.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [captureError]);

  return {
    errors,
    hasError,
    captureError,
    clearErrors,
    clearError,
    lastError: errors[0] || null,
    errorCount: errors.length,
  };
}


export function useRetryWithBackoff(
  fn: () => Promise<any>,
  maxRetries = 3,
  initialDelay = 1000
) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { captureError } = useErrorHandler();

  const executeWithRetry = useCallback(async () => {
    setIsRetrying(true);
    setRetryCount(0);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await fn();
        setIsRetrying(false);
        setRetryCount(0);
        return result;
      } catch (error) {
        setRetryCount(attempt + 1);

        if (attempt === maxRetries - 1) {
          
          setIsRetrying(false);
          captureError(error as Error);
          throw error;
        }

        
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }, [fn, maxRetries, initialDelay, captureError]);

  return {
    executeWithRetry,
    isRetrying,
    retryCount,
  };
}


export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingText, setLoadingText] = useState<string>("");

  const startLoading = useCallback((text = "Carregando...") => {
    setIsLoading(true);
    setLoadingText(text);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText("");
  }, []);

  const withLoading = useCallback(
    async <T>(promise: Promise<T>, text?: string): Promise<T> => {
      startLoading(text);
      try {
        const result = await promise;
        stopLoading();
        return result;
      } catch (error) {
        stopLoading();
        throw error;
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    withLoading,
  };
}
