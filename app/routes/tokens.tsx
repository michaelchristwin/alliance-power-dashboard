export const meta = () => {
  return [
    { title: "Token management | Alliance Power Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

function Tokens() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Token Management
      </h1>
      <p className="dark:text-gray-300">
        Token transfer functionality will go here.
      </p>
    </div>
  );
}

export default Tokens;
