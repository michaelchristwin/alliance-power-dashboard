import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig({
  transports: {
    [sepolia.id]: http(),
  },
  chains: [sepolia],
});
