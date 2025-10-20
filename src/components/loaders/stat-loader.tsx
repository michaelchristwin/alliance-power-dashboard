function StatLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i.toString()}
          className="rounded-xl animate-pulse dark:bg-gray-800 bg-accent h-[107px] shadow-lg overflow-hidden"
        ></div>
      ))}
    </div>
  );
}

export default StatLoader;
