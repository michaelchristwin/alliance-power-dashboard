import EnergyChart from "@/components/EnergyChart";
import BarChartLoader from "@/components/loaders/barchart-loader";
import Statistics from "@/components/Statistics";
import type { Timeframe } from "@/data/mockData";
import { GetDaily } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Alliance Power Dashboard" },
      {
        name: "description",
        content: "View analytics and manage your meter on Alliance Power.",
      },
    ],
  }),
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
  const m3terIds = Array.from({ length: 11 }, (_, i) => 11 + i);
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
        <Statistics m3terIds={m3terIds} />
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
              <EnergyChart
                queryOptions={{
                  queryKey: ["getDaily"],
                  queryFn: () =>
                    GetDaily([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]),
                }}
              />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
