import type { Route } from "./+types/dashboard";
import { motion, type Variants } from "motion/react";
import { carbonData, tokenBalances, type Timeframe } from "~/data/mockData";
import StatsCards from "~/components/StatsCard";
import { useEffect, useState } from "react";
import EnergyChart from "~/components/EnergyChart";
import TokenBalance from "~/components/TokenBalance";
import CarbonImpact from "~/components/CarbonImpact";
import { useQuery } from "@tanstack/react-query";
import { GetDaily } from "~/queries";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Alliance Power Dashboard" },
    { name: "description", content: "Welcome to Alliance Power Dashboard!" },
  ];
}

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");
  const { data, isLoading } = useQuery({
    queryKey: ["getDaily"],
    queryFn: () =>
      Promise.all([
        GetDaily("11"),
        GetDaily("12"),
        GetDaily("13"),
        GetDaily("14"),
        GetDaily("15"),
        GetDaily("16"),
        GetDaily("17"),
        GetDaily("18"),
      ]),
  });
  useEffect(() => {
    if (!isLoading) {
      console.log("Data: ", data);
    }
  }, [isLoading]);
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
          energyGenerated={data?.reduce(
            (total: number, item: { hour: string; energy: number }[]) =>
              total +
              item.reduce(
                (sum: number, d: { hour: string; energy: number }) =>
                  sum + d.energy,
                0
              ),
            0
          )}
          energyMinted={
            0.06 *
            data?.reduce(
              (total: number, item: { hour: string; energy: number }[]) =>
                total +
                item.reduce(
                  (sum: number, d: { hour: string; energy: number }) =>
                    sum + d.energy,
                  0
                ),
              0
            )
          }
          carbonSaved={
            0.36 *
            data?.reduce(
              (total: number, item: { hour: string; energy: number }[]) =>
                total +
                item.reduce(
                  (sum: number, d: { hour: string; energy: number }) =>
                    sum + d.energy,
                  0
                ),
              0
            )
          }
          tokenValue={0.17}
        />
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
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">
              Energy Generation & Minting
            </h2>
            {data && <EnergyChart data={data} />}
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
