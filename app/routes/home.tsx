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
    </motion.div>
  );
}
