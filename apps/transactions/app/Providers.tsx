"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@bytebank-web/utils/react-query";
import { AppSidebar } from "@bytebank-web/ui/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@bytebank-web/ui/sidebar";
import { useSharedStore } from "@bytebank-web/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { email, name } = useSharedStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SidebarProvider>
        <AppSidebar userEmail={email ?? ""} userName={name ?? ""} />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </QueryClientProvider>
  );
};
