import { motion } from "motion/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { useRouteContext } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const colors = [
  "rgba(16,185,129,0.8)", // emerald
  "rgba(59,130,246,0.8)", // blue
  "rgba(249,115,22,0.8)", // orange
  "rgba(236,72,153,0.8)", // pink
  "rgba(139,92,246,0.8)", // violet
];

const EnergyChart = () => {
  const { getDailyQueryOptions } = useRouteContext({ from: "/dashboard" });
  const { data } = useSuspenseQuery(getDailyQueryOptions);
  const chartData: ChartData<"bar"> = {
    labels: data[0].map((item: any) => item.hour),
    datasets: data.map((item: any, i: number) => ({
      label: `M3ter ${11 + i}`,
      data: item.map((d: any) => d.energy),
      backgroundColor: colors[i % colors.length],
      borderColor: colors[i % colors.length].replace("0.8", "1"),
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
      className="h-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Bar data={chartData} options={chartOptions} />
    </motion.div>
  );
};

export default EnergyChart;
