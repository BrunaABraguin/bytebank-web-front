"use client";
import { NAV_LINKS_DASHBOARD } from "@/contants";
import Sidebar from "@repo/ui/Sidebar";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    return NAV_LINKS_DASHBOARD.map(link => ({
      ...link,
      isActive: pathname === link.href,
    }));
  }, [pathname]);
  
  return (
    <div className="bg-green-light">
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen xl:px-28">
        <Sidebar navLinks={navLinks} />
      </div>
    </div>
  );
}
