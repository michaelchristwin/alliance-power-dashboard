import { ArrowLeftRight, ChartColumn, Coins, Leaf, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: ChartColumn,
  },
  {
    title: "Tokens",
    url: "#",
    icon: ArrowLeftRight,
  },
  {
    title: "Staking",
    url: "#",
    icon: Coins,
  },
  {
    title: "Impact",
    url: "#",
    icon: Leaf,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Alliance Power Dashboard</SidebarGroupLabel>
          <SidebarHeader className="h-[50px]"></SidebarHeader>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
