"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

interface NavLinks {
  href: string;
  label: string;
}

interface SidebarProps {
  navLinks: NavLinks[];
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  const pathname = usePathname();

  const links = useMemo(() => {
    return navLinks.map((link) => ({
      ...link,
      isActive: pathname === link.href,
    }));
  }, [pathname, navLinks]);

  return (
    <div>
      <aside className="h-full lg:col-span-1 px-4 rounded-lg">
        <nav className="text-green-dark font-medium flex lg:flex-col max-lg:mb-6 max-lg:justify-between max-md:hidden">
          {links.map(({ href, label, isActive }) => (
            <a
              key={href}
              href={href}
              className={`p-4 ${isActive ? "bg-green-dark text-white" : ""} rounded-lg`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
