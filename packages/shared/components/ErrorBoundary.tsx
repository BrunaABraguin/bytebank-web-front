"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@bytebank-web/ui/button";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { children, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (resetOnPropsChange && hasError && children !== prevProps.children) {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Ops! Algo deu errado
              </h3>
              <p className="text-sm text-gray-600">
                Ocorreu um erro inesperado. Nossa equipe foi notificada e está
                trabalhando para resolver o problema.
              </p>
              {error && process.env.NODE_ENV === "development" && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Detalhes do erro (modo desenvolvimento)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md text-xs font-mono text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {error.toString()}
                    {error.stack && (
                      <>
                        {"\n\n"}
                        Stack trace:
                        {"\n"}
                        {error.stack}
                      </>
                    )}
                  </div>
                </details>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCwIcon className="w-4 h-4" />
                Tentar novamente
              </Button>

              <Button
                onClick={() => window.location.reload()}
                size="sm"
                className="flex items-center gap-2"
              >
                Recarregar página
              </Button>
            </div>

            <div className="text-xs text-gray-400">
              Se o problema persistir, entre em contato com nosso suporte.
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}


export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
