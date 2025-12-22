import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = ({
  message,
  className = "text-gray-500 text-center",
}: EmptyStateProps) => {
  return (
    <div className="flex justify-center items-center h-64">
      <p className={className}>{message}</p>
    </div>
  );
};

interface LoadingStateProps {
  children: ReactNode;
  className?: string;
}

export const LoadingState = ({
  children,
  className = "flex justify-center items-center h-64",
}: LoadingStateProps) => {
  return <div className={className}>{children}</div>;
};
