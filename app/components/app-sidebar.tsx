import {
  FaChartBar,
  FaExchangeAlt,
  FaCoins,
  FaLeaf,
  FaUserAlt,
} from "react-icons/fa";
import { BiCoinStack } from "react-icons/bi";
import { useLocation } from "react-router";
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
    icon: FaChartBar,
  },
  {
    title: "Tokens",
    url: "/tokens",
    icon: FaExchangeAlt,
  },
  {
    title: "Staking",
    url: "/staking",
    icon: FaCoins,
  },
  {
    title: "Impact",
    url: "/impact",
    icon: FaLeaf,
  },
  {
    title: "Profile",
    url: "#",
    icon: FaUserAlt,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: BiCoinStack,
  },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Alliance Power Dashboard</SidebarGroupLabel>
          <SidebarHeader className="h-[50px]"></SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-[10px]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-100 text-[18px] rounded-none h-[45px] dark:hover:bg-gray-800 data-[active=true]:bg-green-50 data-[active=true]:text-green-600 data-[active=true]:dark:bg-green-900/30 data-[active=true]:dark:text-green-400 data-[active=true]:border-r-4 data-[active=true]:border-green-500"
                    isActive={item.url === location.pathname}
                  >
                    <a href={item.url}>
                      <item.icon className="text-[18px]" />
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
