"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@workspace/utils/react-query";
import { AppSidebar } from "@workspace/ui/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/sidebar";

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
