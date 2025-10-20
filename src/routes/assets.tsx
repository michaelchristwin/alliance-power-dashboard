import { useTheme } from "@/components/theme-provider";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/assets")({
  component: Assets,
  validateSearch: (search: Record<string, unknown>) => ({
    m3terId: (search.m3terId as string) ?? "",
    colorLow: (search.colorLow as string) ?? "",
    colorHigh: (search.colorHigh as string) ?? "",
  }),
});

function Assets() {
  const search = useSearch({ from: "/assets" });
  const navigate = useNavigate({ from: "/assets" });
  const { theme } = useTheme();

  const [inputValue, setInputValue] = useState(search.m3terId ?? "");

  useEffect(() => {
    setInputValue(search.m3terId ?? "");
  }, [search.m3terId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({
        search: (prev) => ({
          ...prev,
          m3terId: inputValue,
        }),
        replace: false,
      });
    }
  };

  const { m3terId, colorLow, colorHigh } = search;

  let barChartUrl: string | null = null;
  let activitiesUrl: string | null = null;

  if (m3terId) {
    const barUrl = new URL("https://m3terscan-rr.vercel.app/iframes/bar-chart");
    barUrl.searchParams.set("m3terId", m3terId);
    if (colorLow) barUrl.searchParams.set("colorLow", colorLow);
    if (colorHigh) barUrl.searchParams.set("colorHigh", colorHigh);
    barUrl.searchParams.set("colorScheme", theme as string);
    barUrl.searchParams.set("dark", "#1e2939");
    barChartUrl = barUrl.toString();

    const actUrl = new URL(
      "https://m3terscan-rr.vercel.app/iframes/activities"
    );
    actUrl.searchParams.set("m3terId", m3terId);
    actUrl.searchParams.set("colorScheme", theme as string);
    actUrl.searchParams.set("dark", "#1e2939");
    actUrl.searchParams.set("even", "#111827");
    actUrl.searchParams.set("odd", "#1e2939f4");
    activitiesUrl = actUrl.toString();
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <title>Assets | Alliance Power Dashboard</title>
      <meta name="description" content="View activities of your m3ter." />
      <input
        type="text"
        className="border px-3 py-2 rounded-[50px] w-84 mx-auto"
        placeholder="Enter m3terId..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {barChartUrl && (
        <iframe
          src={barChartUrl}
          className="w-full h-[494px] border"
          title="Bar Chart"
        />
      )}

      {activitiesUrl && (
        <iframe
          src={activitiesUrl}
          className="w-full h-[544.5px] border"
          title="Activities"
        />
      )}
    </div>
  );
}

export default Assets;
