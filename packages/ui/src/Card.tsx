import React from "react";

export const Card = ({
  className = "",
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={`rounded-2xl border-0 bg-white shadow-sm border-gray-300 ${className}`}
      {...props}
    />
  );
};
