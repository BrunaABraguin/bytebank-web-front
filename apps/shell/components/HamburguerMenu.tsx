import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

export const HamburgerMenu: React.FC<{
  colorVariant?: "green" | "orange";
  links: NavLink[];
}> = ({ colorVariant = "green", links }) => {
  const barColor = colorVariant === "orange" ? "bg-orange" : "bg-green";
  return (
    <nav className="sm:hidden relative">
      <input type="checkbox" id="menu-toggle" className="peer hidden" />
      <label
        htmlFor="menu-toggle"
        className="flex flex-col justify-center w-8 h-8 cursor-pointer"
      >
        <span className="sr-only">Abrir menu de navegação</span>
        <span className={`block w-8 h-1 ${barColor} mb-1 rounded`}></span>
        <span className={`block w-8 h-1 ${barColor} mb-1 rounded`}></span>
        <span className={`block w-8 h-1 ${barColor} rounded`}></span>
      </label>
      <div
        className={`absolute left-0 mt-2 w-40 rounded shadow-lg flex-col gap-2 p-4 z-50 hidden peer-checked:flex ${
          colorVariant === "orange"
            ? "bg-green-light text-green-dark"
            : "bg-black text-white"
        }`}
      >
        {links.map(({ href, label, ...params }, idx) => (
          <Link
            key={href}
            href={href}
            {...params}
            className={`text-center hover:underline py-1 block ${
              colorVariant === "orange" && idx !== links.length - 1
                ? "border-b border-green-dark"
                : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
