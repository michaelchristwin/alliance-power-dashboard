import { motion } from "motion/react";
import { useState } from "react";
import { stakingOptions, tokenBalances } from "~/data/mockData";

export const meta = () => {
  return [
    { title: "Staking | Alliance Power Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

function Staking() {
  const [selectedOption, setSelectedOption] = useState<any>();
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("stake"); // stake, unstake

  const calculateRewards = (option: any, amount: string) => {
    const principal = parseFloat(amount) || 0;
    const apy = option.apy / 100;
    const days = option.lockPeriod;

    return ((principal * apy * days) / 365).toFixed(2);
  };

  return (
    <motion.div
      className="p-6 dark:bg-gray-900 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Staking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            className="rounded-xl shadow-lg dark:bg-gray-800 bg-white p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex border-b dark:border-gray-700 mb-6">
              <button
                className={`py-3 px-6 ${
                  activeTab === "stake"
                    ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("stake")}
              >
                Stake Tokens
              </button>
              <button
                className={`py-3 px-6 ${
                  activeTab === "unstake"
                    ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("unstake")}
              >
                Unstake
              </button>
            </div>

            {activeTab === "stake" ? (
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose staking option:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stakingOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        className={`p-4 rounded-lg border cursor-pointer ${
                          selectedOption?.id === option.id
                            ? "border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedOption(option)}
                      >
                        <h3 className="font-medium dark:text-white">
                          {option.name}
                        </h3>
                        <div className="mt-2 flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            APY
                          </span>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {option.apy}%
                          </span>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Lock period
                          </span>
                          <span className="dark:text-gray-300">
                            {option.lockPeriod} days
                          </span>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Min amount
                          </span>
                          <span className="dark:text-gray-300">
                            {option.minAmount} tokens
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount to stake:
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="block w-full pl-4 pr-20 py-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label className="sr-only">Token</label>
                      <select className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 dark:text-gray-300 sm:text-sm rounded-r-lg">
                        <option>ENT</option>
                        <option>CRB</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Available: {tokenBalances.energy} ENT
                    </span>
                    <button
                      className="text-green-600 dark:text-green-400 font-medium"
                      onClick={() =>
                        setStakeAmount(tokenBalances.energy.toString())
                      }
                    >
                      Max
                    </button>
                  </div>
                </div>

                {selectedOption && stakeAmount && (
                  <motion.div
                    className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <h3 className="font-medium mb-2 dark:text-white">
                      Staking summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Staking amount:
                        </span>
                        <span className="dark:text-white">
                          {parseFloat(stakeAmount).toLocaleString()} ENT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Lock period:
                        </span>
                        <span className="dark:text-white">
                          {selectedOption.lockPeriod} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Expected rewards:
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          +{calculateRewards(selectedOption, stakeAmount)} ENT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Unlock date:
                        </span>
                        <span className="dark:text-white">
                          {new Date(
                            Date.now() +
                              selectedOption.lockPeriod * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    !selectedOption ||
                    !stakeAmount ||
                    parseFloat(stakeAmount) < selectedOption?.minAmount
                  }
                >
                  Stake Now
                </motion.button>
              </div>
            ) : (
              <div>
                <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium dark:text-white">
                      Your staked tokens
                    </h3>
                    <p className="text-3xl font-bold mt-2 dark:text-white">
                      480.00 ENT
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      ≈ $72.00 USD
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Staking rewards:
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        +14.70 ENT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Lock period remaining:
                      </span>
                      <span className="dark:text-white">18 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Unlock date:
                      </span>
                      <span className="dark:text-white">August 21, 2025</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-700">
                      Unstake (Early Withdrawal)
                    </button>
                    <p className="text-sm text-center text-red-500 mt-2">
                      Early withdrawal incurs a 10% penalty fee
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            className="rounded-xl shadow-lg dark:bg-gray-800 bg-white p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Staking Stats
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Value Locked
                </p>
                <p className="text-2xl font-bold mt-1 dark:text-white">
                  2,480 ENT + 720 CRB
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  ≈ $574.00 USD
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your Staking Position
                </p>
                <p className="text-2xl font-bold mt-1 dark:text-white">
                  480 ENT
                </p>
                <p className="text-gray-500 dark:text-gray-400">≈ $72.00 USD</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pending Rewards
                </p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  +14.70 ENT
                </p>
                <p className="text-gray-500 dark:text-gray-400">≈ $2.21 USD</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Staking;
