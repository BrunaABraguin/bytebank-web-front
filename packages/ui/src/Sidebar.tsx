import Link from "next/link";
import React from "react";

interface NavLinks {
  href: string;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  navLinks: NavLinks[];
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  return (
    <div>
      <aside className="h-full lg:col-span-1 px-4 lg:py-6 rounded-lg">
        <nav className="text-green-dark font-medium flex lg:flex-col px-6 max-lg:mb-6 max-lg:justify-between max-md:hidden">
          {navLinks.map(({ href, label, isActive }) => (
            <Link
              key={href}
              href={href}
              className={`p-4 ${
                isActive ? "bg-green-dark text-white" : ""
              } rounded-lg`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
