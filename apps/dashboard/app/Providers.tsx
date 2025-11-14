"use client";
import { AppProvider } from "@bytebank-web/presentation/providers";
import { AppSidebar } from "@bytebank-web/ui/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@bytebank-web/ui/sidebar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </AppProvider>
  );
};
