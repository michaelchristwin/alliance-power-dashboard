import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    m3terId: (search.m3terId as string) ?? "",
  }),
});

function RouteComponent() {
  const search = useSearch({ from: "/profile" });
  const navigate = useNavigate({ from: "/profile" });

  const [inputValue, setInputValue] = useState(search.m3terId ?? "");

  useEffect(() => {
    // keep input in sync with URL
    setInputValue(search.m3terId ?? "");
  }, [search.m3terId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({
        search: (prev) => ({ ...prev, m3terId: inputValue }),
        replace: false, // push a new entry in history
      });
    }
  };

  const m3terId = search.m3terId;
  const mapFrameUrl = m3terId
    ? `https://m3terscan-rr.vercel.app/iframes/map?m3terId=${encodeURIComponent(
        m3terId
      )}`
    : null;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <title>Profile | Alliance Power Dashboard</title>
      <meta name="description" content="" />
      <input
        type="text"
        className="border px-3 py-2 rounded-[50px] w-84 mx-auto"
        placeholder="Enter m3terId..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {mapFrameUrl && (
        <iframe
          src={mapFrameUrl}
          className="w-full h-[494px] border"
          title="Map Frame"
        />
      )}
    </div>
  );
}
