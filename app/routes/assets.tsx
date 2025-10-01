import { useSearchParams } from "react-router";
import { useState } from "react";
import { useTheme } from "remix-themes";

export function meta() {
  return [
    { title: "Assets | Alliance Power Dashboard" },
    { name: "description", content: "View activities of your m3ter" },
  ];
}

function Assets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("m3terId") || ""
  );

  const m3terId = searchParams.get("m3terId");
  const colorLow = searchParams.get("colorLow");
  const colorHigh = searchParams.get("colorHigh");
  const [theme, _] = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // preserve optional params if they exist
      const params: Record<string, string> = { m3terId: inputValue };
      if (colorLow) params.colorLow = colorLow;
      if (colorHigh) params.colorHigh = colorHigh;
      setSearchParams(params);
    }
  };

  // Build iframe URLs only if m3terId exists
  let barChartUrl: string | null = null;
  let activitiesUrl: string | null = null;
  console.log(theme);
  if (m3terId) {
    const barUrl = new URL("https://m3terscan-rr.vercel.app/iframes/bar-chart");
    barUrl.searchParams.set("m3terId", m3terId);
    if (colorLow) barUrl.searchParams.set("colorLow", colorLow);
    if (colorHigh) barUrl.searchParams.set("colorHigh", colorHigh);
    barUrl.searchParams.set("colorScheme", theme as string);
    barChartUrl = barUrl.toString();

    const actUrl = new URL(
      "https://m3terscan-rr.vercel.app/iframes/activities"
    );
    actUrl.searchParams.set("m3terId", m3terId); // required
    actUrl.searchParams.set("colorScheme", theme as string);
    activitiesUrl = actUrl.toString();
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Search bar */}
      <input
        type="text"
        className="border px-3 py-2 rounded-[50px] w-84 mx-auto"
        placeholder="Enter m3terId..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Iframes: only render if m3terId exists */}
      {barChartUrl && (
        <iframe
          src={barChartUrl}
          className="w-full h-[600px] border"
          title="Bar Chart"
        />
      )}

      {activitiesUrl && (
        <iframe
          src={activitiesUrl}
          className="w-full h-[600px] border"
          title="Activities"
        />
      )}
    </div>
  );
}

export default Assets;
