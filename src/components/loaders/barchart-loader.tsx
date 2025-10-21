import { Loader } from "lucide-react";

function BarChartLoader() {
  return (
    <div className="w-full h-80 rounded-xl dark:bg-gray-800 bg-accent flex justify-center items-center animate-pulse">
      <div className="block w-fit">
        <Loader size={25} className="animate-spin text-blue-500 mx-auto" />
        <p className="text-gray-500 italic">Loading...</p>
      </div>
    </div>
  );
}

export default BarChartLoader;
