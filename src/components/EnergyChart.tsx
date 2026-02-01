import { motion } from "motion/react";
import { Line } from "react-chartjs-2";
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

  const labels = Array.from(
    { length: 24 },
    (_, h) => `${String(h).padStart(2, "0")}:00`,
  );

  const chartData: ChartData<"line"> = {
    labels,
    datasets: data.map((item, i) => {
      const values = new Array(24).fill(null);

      item.forEach((d) => {
        const hour = new Date(d.hour_start_utc).getUTCHours();
        values[hour] = d.total_energy;
      });

      return {
        label: labelFormatter(i),
        data: values,
        spanGaps: true,
        borderColor: getHighlyDistinctColor(meterIds[i]),
        backgroundColor: getHighlyDistinctColor(meterIds[i]).replace(
          /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/,
          (_, h, s) => `hsla(${h}, ${s}%, 62%, 0.6)`,
        ),
        fill: true,
        tension: 0.3,
        borderWidth: 1,
        stack: "combined",
      };
    }),
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        fill: true,
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
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
      <Line data={chartData} options={chartOptions} />
    </motion.div>
  );
};

export default EnergyChart;
