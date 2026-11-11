import { QueryClient } from "@tanstack/react-query";
import { Client, cacheExchange, fetchExchange } from "urql";

export function getContext() {
  const queryClient = new QueryClient();
  const client = new Client({
    url: "https://ponder.m3ter.ing/graphql",
    exchanges: [cacheExchange, fetchExchange],
    preferGetMethod: false,
  });
  return {
    queryClient,
    urqlClient: client,
  };
}
