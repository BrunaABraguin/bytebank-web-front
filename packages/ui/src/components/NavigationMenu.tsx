import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../sidebar";

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
