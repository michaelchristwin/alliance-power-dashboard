import {
  FaChartBar,
  FaExchangeAlt,
  FaCoins,
  FaLeaf,
  FaUserAlt,
} from "react-icons/fa";
import { BiCoinStack } from "react-icons/bi";
import { NavLink } from "react-router";
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
import { MdPayment } from "react-icons/md";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
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
    url: "/profile",
    icon: FaUserAlt,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: BiCoinStack,
  },
  {
    title: "Payment",
    url: "/payment",
    icon: MdPayment,
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
            <SidebarMenu className="gap-y-[10px]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-gray-100 text-[18px] rounded-none h-[45px] dark:hover:bg-gray-800 ${isActive ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-r-4 border-green-500" : ""}`}
                      >
                        <div className="w-full flex space-x-1.5">
                          <item.icon className="text-[18px]" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
