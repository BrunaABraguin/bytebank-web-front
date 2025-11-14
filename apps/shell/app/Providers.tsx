"use client";

import { AppProvider } from "@bytebank-web/presentation/providers";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppProvider>{children}</AppProvider>;
}
