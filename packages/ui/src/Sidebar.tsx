"use client";
import React from "react";
import { NavLinkProps, SidebarNavLink } from "./SidebarNavLink";

interface SidebarProps {
  navLinks: NavLinkProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  return (
    <div>
      <aside className="h-full lg:col-span-1 px-4 rounded-lg">
        <nav className="text-green-dark font-medium flex lg:flex-col max-lg:mb-6 max-lg:justify-between max-md:hidden">
          <SidebarNavLink navLinks={navLinks} />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
