import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("tokens", "routes/tokens.tsx"),
  route("staking", "routes/staking.tsx"),
  route("impact", "routes/impact.tsx"),
  route("assets", "routes/assets.tsx"),
  route("payment", "routes/payment.tsx"),
  route("action/set-theme", "routes/action/set-theme.tsx"),
] satisfies RouteConfig;
