"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@bytebank-web/utils/react-query";
import { AppSidebar } from "@bytebank-web/ui/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@bytebank-web/ui/sidebar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </QueryClientProvider>
  );
};
