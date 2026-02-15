import { createFileRoute } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { tempLocationData, type TempLocationKey } from "@/data/locations-tmp";
import { GetDaily } from "@/queries";
import { motion, type Variants } from "motion/react";
import { Suspense, useState } from "react";
import BarChartLoader from "@/components/loaders/barchart-loader";
import type { Timeframe } from "@/data/mockData";
import EnergyChart from "@/components/EnergyChart";
import Statistics3 from "@/components/Statistics3";

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

export const Route = createFileRoute("/$location")({
  component: RouteComponent,
  loader: ({ params }) => {
    if (!(params.location in tempLocationData)) {
      throw new Error("Invalid location");
    }
    const location = params.location as TempLocationKey;
    const m3terIds = [...tempLocationData[location].meterIds];
    const title = tempLocationData[location].title;
    return {
      location,
      m3terIds,
      title,
    };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title} Dashboard` }],
  }),
});

function RouteComponent() {
  const { location, title, m3terIds } = Route.useLoaderData();
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");
  const [checked, setChecked] = useState(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <meta name="description" content="Welcome to Alliance Power Dashboard!" />
      <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
        {title} Usage Stats
      </motion.h1>

      <motion.div className="mb-6" variants={itemVariants}>
        <Statistics3 m3terIds={m3terIds} />
      </motion.div>
      <div className="flex mb-4 space-x-4 justify-between">
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
        <div className="flex items-center space-x-2">
          <Switch
            id="isRolling"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="isRolling">Rolling Mode</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <div className={`p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white`}>
            <h2 className="text-xl font-semibold mb-4">
              Energy Generation & Minting
            </h2>
            <Suspense fallback={<BarChartLoader />}>
              <EnergyChart
                isRolling={checked}
                meterIds={m3terIds}
                labelFormatter={(i) => `Phase ${alphabet[i]}`}
                queryOptions={{
                  queryKey: ["getDaily", location],
                  queryFn: () => GetDaily(m3terIds),
                }}
              />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
