import { createFileRoute, useLocation } from "@tanstack/react-router";
import { locationData, type LocationKey } from "@/data/locations";
import { GetDaily } from "@/queries";
import { motion, type Variants } from "motion/react";
import { Suspense, useState } from "react";
import BarChartLoader from "@/components/loaders/barchart-loader";
import type { Timeframe } from "@/data/mockData";
import EnergyChart from "@/components/EnergyChart";
import Statistics2 from "@/components/Statistics2";
import { useMutation } from "@tanstack/react-query";
import { exportPagePdfServer } from "@/server/pagetopdf.server";
import { Loader } from "lucide-react";

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

export const Route = createFileRoute("/dashboard/$location")({
  component: RouteComponent,
  loader: ({ params }) => {
    if (!(params.location in locationData)) {
      throw new Error("Invalid location");
    }
    const location = params.location as LocationKey;
    const m3terIds = [...locationData[location].meterIds];
    const title = locationData[location].title;
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

  const routeLocation = useLocation();

  const { mutateAsync: downloadPdf, isPending } = useMutation({
    mutationFn: async () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      const response = await exportPagePdfServer({
        data: {
          url: `${window.location.origin}${routeLocation.href}`,
          width: innerWidth,
          height: innerHeight,
          dpr: devicePixelRatio,
        },
        headers: {
          "x-internal-secret": process.env.INTERNAL_FUNCTION_SECRET || "",
        },
      });
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "page.pdf";
      a.click();
      URL.revokeObjectURL(url);
    },
    mutationKey: ["downloadPdf", location],
  });
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
        <Statistics2 m3terIds={m3terIds} />
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
      <div className="w-full h-[50px] flex items-center justify-end">
        <button
          type="button"
          disabled={isPending}
          className="bg-green-600 h-[40px] w-[150px] flex space-x-1 justify-center items-center rounded-lg hover:bg-green-600/90 active:hover:bg-green-600/80 disabled:bg-green-600/60"
          onClick={() => downloadPdf()}
        >
          {isPending ? (
            <>
              <span>Exporting</span>
              <Loader size={19} className="animate-spin text-white" />
            </>
          ) : (
            "Export as PDF"
          )}
        </button>
      </div>
    </motion.div>
  );
}
