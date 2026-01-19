import { motion } from "motion/react";
import { FaBell, FaCog } from "react-icons/fa";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
