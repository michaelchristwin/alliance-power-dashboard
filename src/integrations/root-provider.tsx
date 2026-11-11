import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Client, Provider as UrqlProvider } from "urql";

export function Provider({
  children,
  queryClient,
  urqlClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  urqlClient: Client;
}) {
  return (
    <UrqlProvider value={urqlClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UrqlProvider>
  );
}
