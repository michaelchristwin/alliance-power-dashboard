import { motion } from "motion/react";
import { FaBolt, FaLeaf } from "react-icons/fa";

const TokenBalance = ({
  energyTokens,
  carbonTokens,
}: {
  energyTokens: number;
  carbonTokens: number;
}) => {
  const tokens = [
    {
      name: "Energy Tokens",
      symbol: "ENT",
      balance: energyTokens,
      icon: <FaBolt className="text-yellow-400" />,
      color:
        "from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600",
      usdValue: energyTokens * 0.15,
    },
    {
      name: "Carbon Credits",
      symbol: "CRB",
      balance: carbonTokens,
      icon: <FaLeaf className="text-green-400" />,
      color:
        "from-green-400 to-green-500 dark:from-green-500 dark:to-green-600",
      usdValue: carbonTokens * 0.28,
    },
  ];

  return (
    <div className="p-6 rounded-xl shadow-lg h-full bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Token Balance
      </h2>

      <div className="space-y-4">
        {tokens.map((token, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full bg-gradient-to-r ${token.color}`}
                >
                  {token.icon}
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-white">
                    {token.name}
                  </h3>
                  <p className="text-sm text-gray-500">{token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {token.balance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  $
                  {token.usdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Token Activity</span>
                <span className="text-green-600 dark:text-green-400">
                  +12% this month
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${token.color}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "60%" }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <motion.button
          className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Transfer Tokens
        </motion.button>
      </div>
    </div>
  );
};

export default TokenBalance;
