import { motion, type Variants } from "motion/react";
import { GiElectric } from "react-icons/gi";
import { FaSolarPanel, FaLeaf, FaDollarSign } from "react-icons/fa";
import { useReadContracts } from "wagmi";
import { rollupContract } from "@/config/rollup";
import StatLoader from "./loaders/stat-loader";
import { hexToNumber, type Address } from "viem";

const formatter = new Intl.NumberFormat("en-US");

const cardVariants: Variants = {
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

function Statistics({ m3terIds }: { m3terIds: number[] }) {
  const { data: accountHexes, isLoading } = useReadContracts({
    allowFailure: true,
    contracts: m3terIds.map((id) => ({
      ...rollupContract,
      functionName: "account",
      args: [BigInt(id)],
    })),
  });

  if (isLoading) {
    return <StatLoader />;
  }

  if (accountHexes) {
    const validAccounts = accountHexes
      .filter((item) => item.status === "success")
      .map((item) => hexToNumber(item.result as Address) / 1_000_000);
    const energyData = validAccounts.reduce((sum, val) => sum + val, 0);
    const totalEnergy = energyData / 1000;
    const carbonSaved = 0.36 * energyData;
    const tokenValue = 0.17;
    const stats = [
      {
        title: "Energy Generated",
        value: `${formatter.format(totalEnergy)} MWh`,
        icon: FaSolarPanel,
        color: "bg-blue-500 dark:bg-blue-600",
      },
      {
        title: "Total M3ters",
        value: `${m3terIds.length} devices`,
        icon: GiElectric,
        color: "bg-green-500 dark:bg-green-600",
      },
      {
        title: "Carbon Offset",
        value: `${formatter.format(carbonSaved)} kg`,
        icon: FaLeaf,
        color: "bg-amber-500 dark:bg-amber-600",
      },
      {
        title: "Revenue",
        value: `$${formatter.format(tokenValue * energyData)}`,
        icon: FaDollarSign,
        color: "bg-purple-500 dark:bg-purple-600",
      },
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index.toString()}
            className="rounded-xl shadow-lg overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6 dark:bg-gray-800 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold mt-1 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <stat.icon />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
}

export default Statistics;
