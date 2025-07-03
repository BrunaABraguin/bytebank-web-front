import React from "react";

export const Progress = (
  { value, max = 100, className = "", ...props }: { value: number; max?: number } & React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div
      className={`w-full h-2 bg-gray-200 rounded-full ${className}`}
      {...props}
    >
      <div
        className="h-full rounded-full bg-orange-500 transition-all"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
