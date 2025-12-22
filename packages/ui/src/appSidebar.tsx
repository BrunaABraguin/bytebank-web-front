import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "./sidebar";
import Image from "next/image";
import { LayoutDashboard, Receipt } from "lucide-react";
import { NavigationMenu } from "./components/NavigationMenu";
import { UserMenu } from "./components/UserMenu";

interface AppSidebarProps {
  userEmail: string;
  userName: string;
}

const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    url: "transactions",
    icon: Receipt,
  },
];

export function AppSidebar({ userEmail, userName }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <Image
          src="/logo.svg"
          alt="Bytebank"
          width={150}
          height={32}
          className="h-6 my-4"
          priority
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu items={items} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <UserMenu name={userName} email={userEmail} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
