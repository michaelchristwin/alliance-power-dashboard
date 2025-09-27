export const meta = () => {
  return [
    { title: "Impact | Alliance Power Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

function Impact() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Environmental Impact
      </h1>
      <p className="dark:text-gray-300">
        Environmental impact details will go here.
      </p>
    </div>
  );
}

export default Impact;
