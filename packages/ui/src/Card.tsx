import React from "react";

export const Card = ({
  className = "",
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm ${className}`}
      {...props}
    />
  );
};
