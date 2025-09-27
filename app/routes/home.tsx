import type { Route } from "./+types/home";
import { motion, type Variants } from "motion/react";
import {
  energyData,
  carbonData,
  tokenBalances,
  type Timeframe,
} from "~/data/mockData";
import StatsCards from "~/components/StatsCard";
import { useState } from "react";
import EnergyChart from "~/components/EnergyChart";
import TokenBalance from "~/components/TokenBalance";
import CarbonImpact from "~/components/CarbonImpact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
        Energy Dashboard
      </motion.h1>

      <motion.div className="mb-6" variants={itemVariants}>
        <StatsCards
          energyGenerated={energyData[timeframe].generated.reduce(
            (a, b) => a + b,
            0
          )}
          energyMinted={energyData[timeframe].minted.reduce((a, b) => a + b, 0)}
          carbonSaved={carbonData.totalSaved}
          tokenValue={tokenBalances.energy * 0.15 + tokenBalances.carbon * 0.28}
        />
      </motion.div>
      <div className="flex mb-4 space-x-4">
        {["daily", "weekly", "monthly"].map((option) => (
          <button
            key={option}
            onClick={() => setTimeframe(option as Timeframe)}
            className={`px-4 py-2 rounded-lg ${
              timeframe === option
                ? "dark:bg-green-600 dark:text-white bg-green-500 text-white"
                : "dark:bg-gray-700 dark:text-gray-300 bg-gray-200 text-gray-700"
            } transition-colors`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">
              Energy Generation & Minting
            </h2>
            <EnergyChart data={energyData[timeframe]} />
          </div>
        </motion.div>

        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <TokenBalance
            energyTokens={tokenBalances.energy}
            carbonTokens={tokenBalances.carbon}
          />
        </motion.div>

        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
            <CarbonImpact data={carbonData} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
