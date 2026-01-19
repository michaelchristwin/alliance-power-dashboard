import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect } from "react";
import { DailyBarChart, ActivitiesTable } from "m3terscan-components";
import { useQuery } from "wagmi/query";
import { m3terscanClient } from "@/queries";
import {
  getActivitiesM3TerM3TerIdActivitiesGetOptions,
  getDailyM3TerM3TerIdDailyGetOptions,
} from "@/api-client/@tanstack/react-query.gen";

const searchSchema = z.object({
  m3terId: z.coerce.number().optional(),
  colorLow: z.string().optional(),
  colorHigh: z.string().optional(),
});

export const Route = createFileRoute("/assets")({
  component: Assets,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Assets - Alliance Power Dashboard" },
      { name: "description", content: "View activities of your m3ter." },
    ],
  }),
});

function Assets() {
  const search = useSearch({ from: "/assets" });
  const navigate = useNavigate({ from: "/assets" });

  const [inputValue, setInputValue] = useState(
    search.m3terId?.toString() ?? "",
  );

  useEffect(() => {
    setInputValue(search.m3terId?.toString() ?? "");
  }, [search.m3terId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({
        search: (prev) => ({
          ...prev,
          m3terId: inputValue ? Number(inputValue) : undefined,
        }),
        replace: false,
      });
    }
  };

  const { m3terId } = search;

  const { data, isError, isLoading } = useQuery({
    ...getDailyM3TerM3TerIdDailyGetOptions({
      client: m3terscanClient,
      path: {
        m3ter_id: m3terId!,
      },
    }),
    enabled: !!m3terId,
  });

  const {
    data: activitesData,
    isError: activitesError,
    isLoading: activitiesLoading,
  } = useQuery({
    ...getActivitiesM3TerM3TerIdActivitiesGetOptions({
      client: m3terscanClient,
      path: {
        m3ter_id: m3terId!,
      },
    }),
    enabled: !!m3terId,
  });
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <input
        type="text"
        className="border px-3 py-2 rounded-3xl w-84 mx-auto outline-0 border-neutral-500"
        placeholder="Enter meter ID"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="w-full h-[500px]">
        <DailyBarChart data={data} error={isError} isLoading={isLoading} />
      </div>

      <div className="w-full min-h-[500px]">
        <ActivitiesTable
          headerColor="#05df72"
          data={activitesData}
          error={activitesError}
          isLoading={activitiesLoading}
        />
      </div>
    </div>
  );
}

export default Assets;
