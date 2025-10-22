import EnergyChart from "@/components/EnergyChart";
import BarChartLoader from "@/components/loaders/barchart-loader";
import StatLoader from "@/components/loaders/stat-loader";
import StatsCards from "@/components/StatsCard";
import type { Timeframe } from "@/data/mockData";
import { getDailyAP } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad() {
    return {
      getDailyQueryOptions: { queryKey: ["getDaily"], queryFn: getDailyAP },
    };
  },
  loader: async ({ context: { getDailyQueryOptions, queryClient } }) => {
    queryClient.prefetchQuery(getDailyQueryOptions);
  },
});

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

function Dashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");

  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <title>Dashboard | Alliance Power</title>
      <meta name="description" content="Welcome to Alliance Power Dashboard!" />
      <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
        Energy Dashboard
      </motion.h1>

      <motion.div className="mb-6" variants={itemVariants}>
        <Suspense fallback={<StatLoader />}>
          <StatsCards />
        </Suspense>
      </motion.div>
      <div className="flex mb-4 space-x-4">
        {["daily"].map((option) => (
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
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">
              Energy Generation & Minting
            </h2>
            <Suspense fallback={<BarChartLoader />}>
              <EnergyChart />
            </Suspense>
          </div>
        </motion.div>

        {/* <motion.div className="lg:col-span-1" variants={itemVariants}>
          <TokenBalance
            energyTokens={tokenBalances.energy}
            carbonTokens={tokenBalances.carbon}
          />
        </motion.div> */}

        {/* <motion.div className="lg:col-span-3" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
            <CarbonImpact data={carbonData} />
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
}
