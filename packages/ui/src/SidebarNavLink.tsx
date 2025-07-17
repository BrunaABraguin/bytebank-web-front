"use client";
export type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: Readonly<NavLinkProps>) => {
  return (
    <a href={href} className={"p-4 rounded-lg text-green-dark"}>
      {label}
    </a>
  );
};

export const SidebarNavLink = ({ navLinks }: { navLinks: NavLinkProps[] }) => {
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <NavLink key={href} href={href} label={label} />
      ))}
    </>
  );
};
