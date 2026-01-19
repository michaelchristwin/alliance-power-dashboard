import "chart.js/auto";
import { createRouter } from "@tanstack/react-router";
import * as TanstackQuery from "./integrations/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { getContext } from "./integrations/client";

// Create a new router instance
export function getRouter() {
  const rqContext = getContext();
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      );
    },
  });
  return router;
}
