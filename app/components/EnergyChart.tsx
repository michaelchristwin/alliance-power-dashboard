import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";
import { motion } from "motion/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EnergyChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Energy Generated (kWh)",
        data: data.generated,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Energy Minted (kWh)",
        data: data.minted,
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgb(75, 85, 99)", // text-gray-600
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "white",
        titleColor: "rgb(31, 41, 55)", // text-gray-800
        bodyColor: "rgb(75, 85, 99)", // text-gray-600
        borderColor: "rgb(229, 231, 235)", // gray-200
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "rgb(75, 85, 99)", // gray-600
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "rgb(75, 85, 99)", // gray-600
        },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 2000,
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
      <Line
        data={chartData}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              ...chartOptions.plugins?.legend,
              labels: {
                ...chartOptions.plugins?.legend?.labels,
                color: "rgb(75,85,99)", // fallback
              },
            },
            tooltip: {
              ...chartOptions.plugins?.tooltip,
              backgroundColor: "white",
            },
          },
          scales: {
            x: {
              ...chartOptions.scales?.x,
              grid: { color: "rgba(0,0,0,0.1)" },
              ticks: { color: "rgb(75,85,99)" },
            },
            y: {
              ...chartOptions.scales?.y,
              grid: { color: "rgba(0,0,0,0.1)" },
              ticks: { color: "rgb(75,85,99)" },
            },
          },
        }}
        className="[&_.legend-item]:dark:text-gray-200 [&_.tooltip]:dark:bg-gray-800 [&_.tooltip]:dark:text-gray-100"
      />
    </motion.div>
  );
};

export default EnergyChart;
