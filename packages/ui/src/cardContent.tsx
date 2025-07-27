import React from "react";

export const CardContent = ({
  className = "",
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) => {
  return <div className={`p-6 ${className}`} {...props} />;
}
