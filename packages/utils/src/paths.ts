const PATH = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};

export const NAV_LINKS_DASHBOARD = [
  { href: PATH.DASHBOARD, label: "Dashboard" },
  { href: `${PATH.DASHBOARD}/transactions`, label: "Transações" },
];
