import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { FaSolarPanel, FaCoins, FaLeaf, FaDollarSign } from "react-icons/fa";

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

const StatsCards = () => {
  const { getDailyQueryOptions } = useRouteContext({ from: "/dashboard" });
  const { data } = useSuspenseQuery(getDailyQueryOptions);
  const energyGenerated = data?.reduce(
    (total: number, item: { hour: string; energy: number }[]) =>
      total +
      item.reduce(
        (sum: number, d: { hour: string; energy: number }) => sum + d.energy,
        0
      ),
    0
  );
  const energyMinted =
    0.06 *
    data?.reduce(
      (total: number, item: { hour: string; energy: number }[]) =>
        total +
        item.reduce(
          (sum: number, d: { hour: string; energy: number }) => sum + d.energy,
          0
        ),
      0
    );

  const carbonSaved =
    0.36 *
    data?.reduce(
      (total: number, item: { hour: string; energy: number }[]) =>
        total +
        item.reduce(
          (sum: number, d: { hour: string; energy: number }) => sum + d.energy,
          0
        ),
      0
    );

  const tokenValue = 0.17;
  const stats = [
    {
      title: "Energy Generated",
      value: `${formatter.format(energyGenerated)} kWh`,
      icon: FaSolarPanel,
      color: "bg-blue-500 dark:bg-blue-600",
    },
    {
      title: "Energy Minted",
      value: `${formatter.format(energyMinted)} kWh`,
      icon: FaCoins,
      color: "bg-green-500 dark:bg-green-600",
    },
    {
      title: "Carbon Offset",
      value: `${formatter.format(carbonSaved)} kg`,
      icon: FaLeaf,
      color: "bg-amber-500 dark:bg-amber-600",
    },
    {
      title: "Energy Price",
      value: `$${formatter.format(tokenValue)}`,
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
};

export default StatsCards;
