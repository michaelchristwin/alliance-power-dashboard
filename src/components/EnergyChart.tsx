import { motion } from "motion/react";
import { Bar } from "react-chartjs-2";
import type { ChartOptions, ChartData } from "chart.js/auto";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { DailyResponse } from "@/api-client";
import { getHighlyDistinctColor } from "@/lib/utils";

type EnergyChartProps = {
  queryKey: string[];
  queryFn: () => Promise<DailyResponse[][]>;
};
type LabelFormatter = (index: number) => string;

const EnergyChart = ({
  queryOptions,
  labelFormatter,
  meterIds,
}: {
  queryOptions: EnergyChartProps;
  labelFormatter: LabelFormatter;
  meterIds: number[];
}) => {
  const { data } = useSuspenseQuery(queryOptions);

  const chartData: ChartData<"bar"> = {
    labels: data[0].map((item) =>
      new Date(item.hour_start_utc).toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    ),

    datasets: data.map((item, i) => ({
      label: labelFormatter(i),
      data: item.map((d) => d.total_energy),
      backgroundColor: getHighlyDistinctColor(meterIds[i]),
      borderColor: getHighlyDistinctColor(meterIds[i]),
      borderWidth: 1,
      stack: "combined", // enable stacking
    })),
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(75,85,99)", // text-gray-600
          font: {
            family: "'Inter', sans-serif",
            size: 10,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "white",
        titleColor: "rgb(31,41,55)",
        bodyColor: "rgb(75,85,99)",
        borderColor: "rgb(229,231,235)",
        borderWidth: 1,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          color: "rgb(75,85,99)",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          color: "rgb(75,85,99)",
        },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <motion.div
      className="h-90"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Bar data={chartData} options={chartOptions} />
    </motion.div>
  );
};

export default EnergyChart;
