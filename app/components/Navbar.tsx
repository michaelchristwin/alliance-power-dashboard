import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "motion/react";
import { FaBell, FaCog } from "react-icons/fa";
import { useAccount, useDisconnect } from "wagmi";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <motion.nav
      className="px-6 py-4 flex items-center justify-between shadow-sm z-10 dark:bg-gray-800 dark:text-white bg-white text-gray-800"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SidebarTrigger />

      <div className="flex items-center space-x-4">
        <ModeToggle />
        {/* Notification Icon */}
        <button className="p-2 rounded-full dark:hover:bg-gray-700 hover:bg-gray-100">
          <FaBell />
        </button>
        {/* Settings Icon */}
        <button className="p-2 rounded-full dark:hover:bg-gray-700 hover:bg-gray-100">
          <FaCog />
        </button>

        {!isConnected ? (
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                suppressHydrationWarning
                onClick={openConnectModal}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </ConnectButton.Custom>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              {formatAddress(address as `0x${string}`)}
            </span>
            <button
              onClick={() => disconnect()}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
