import { lazy, ComponentType, ReactElement, Suspense } from "react";
import { Loading } from "@bytebank-web/ui/loading";

interface LazyComponentProps {
  fallback?: ReactElement;
  onError?: (error: Error) => void;
}

export function withLazyLoading<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: LazyComponentProps = {}
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: P) {
    const fallback = options.fallback || (
      <div className="flex items-center justify-center p-8">
        <Loading />
      </div>
    );

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export function withSuspense<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactElement
) {
  return function SuspenseWrapper(props: P) {
    const suspenseFallback = fallback || (
      <div className="flex items-center justify-center p-8">
        <Loading />
      </div>
    );

    return (
      <Suspense fallback={suspenseFallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}
