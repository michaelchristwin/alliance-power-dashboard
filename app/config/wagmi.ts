import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const projectId = import.meta.env.VITE_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "Alliance Power Dashboard",
  projectId: projectId,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
