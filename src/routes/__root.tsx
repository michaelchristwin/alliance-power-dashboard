import "@/index.css";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { WagmiProvider } from "wagmi";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { config } from "@/config/wagmi";

const RootLayout = () => (
  <ThemeProvider>
    <WagmiProvider config={config}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="py-3 px-8">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </WagmiProvider>
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </ThemeProvider>
);

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
