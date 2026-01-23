import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alliance Power Dashboard" },
      {
        name: "description",
        content: "View analytics and manage your meter on Alliance Power.",
      },
    ],
  }),
  loader: () => {
    throw redirect({ to: "/dashboard" });
  },
});
