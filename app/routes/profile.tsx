import { useState } from "react";
import { useSearchParams } from "react-router";

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("m3terId") || ""
  );
  const m3terId = searchParams.get("m3terId");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params: Record<string, string> = { m3terId: inputValue };
      setSearchParams(params);
    }
  };
  let mapFrameUrl: string | null = null;
  if (m3terId) {
    const mapUrl = new URL("https://m3terscan-rr.vercel.app/iframes/map");
    mapUrl.searchParams.set("m3terId", m3terId);
    mapFrameUrl = mapUrl.toString();
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
      {mapFrameUrl && (
        <iframe
          src={mapFrameUrl}
          className="w-full h-[494px] border"
          title="Bar Chart"
        />
      )}
    </div>
  );
}

export default Profile;
