/// <reference types="vite/client" />
import appCss from "@/index.css?url";
import { useMemo, type ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { WagmiProvider } from "wagmi";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { config } from "@/config/wagmi";
import { getColorScheme } from "@/lib/theme";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Alliance Power Dashboard",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
    ],
  }),
  component: RootComponent,
  loader: async () => {
    const colorScheme = await getColorScheme();
    return colorScheme;
  },
});

function RootComponent() {
  return (
    <RootDocument>
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
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const colorScheme = Route.useLoaderData();
  const resolvedClass = useMemo(() => {
    if (typeof window === "undefined") return colorScheme; // Server fallback
    if (colorScheme !== "system") return colorScheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, [colorScheme]);
  return (
    <html className={resolvedClass} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = ${JSON.stringify(colorScheme)};
                if (theme === 'system') {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.add(isDark ? 'dark' : 'light');
                } else {
                  document.documentElement.classList.add(theme);
                }
              })()
            `,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
