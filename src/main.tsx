import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import * as TanstackQuery from "./integrations/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const rqContext = TanstackQuery.getContext();
const router = createRouter({
  routeTree,
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

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
