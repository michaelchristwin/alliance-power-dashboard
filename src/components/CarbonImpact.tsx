import { motion, type Variants } from "motion/react";
import { FaTree, FaCar, FaHome } from "react-icons/fa";

const CarbonImpact = ({ data }: { data: any }) => {
  const impactItems = [
    {
      icon: <FaTree className="text-green-500 text-3xl" />,
      title: "Trees Equivalent",
      value: data.equivalents.trees,
      description: "Annual CO₂ absorption",
    },
    {
      icon: <FaCar className="text-blue-500 text-3xl" />,
      title: "Car Miles Avoided",
      value: data.equivalents.carMiles.toLocaleString(),
      description: "Equivalent emissions reduction",
    },
    {
      icon: <FaHome className="text-amber-500 text-3xl" />,
      title: "Home Energy",
      value: data.equivalents.homeEnergy,
      description: "Days of average household energy",
    },
  ];

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div>
      <div className="mb-6">
        <motion.div
          className="p-6 rounded-xl bg-green-50 dark:bg-gray-700 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-white">
                Total CO₂ Offset
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your contribution to fighting climate change
              </p>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {data.totalSaved.toLocaleString()} kg
            </div>
          </div>

          <div className="mt-4">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-300"
                style={{ width: "65%" }}
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Monthly Goal
              </span>
              <span className="text-green-600 dark:text-green-400">
                {data.monthlyReduction.toLocaleString()} kg / 650 kg
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-700"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-800 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonImpact;
