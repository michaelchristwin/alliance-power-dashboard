import { getDailyM3TerM3TerIdDailyGetOptions } from "@/api-client/@tanstack/react-query.gen";
import { createClient } from "@/api-client/client";
import { abi } from "@/config/abi";
import { rollupContract } from "@/config/rollup";
import { config } from "@/config/wagmi";
import { getContext } from "@/integrations/client";
import { readContract } from "@wagmi/core";
import { hexToNumber } from "viem";

export async function GetMonthly(m3terId: string) {
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i); // 0–11 inclusive

  const responses = await Promise.all(
    months.map(async (month) => {
      const response = await fetch(
        `http://localhost:8080/m3ter/${m3terId}/months/${year}/${month}`
      );
      return response.json();
    })
  );

  return responses; // array of 12 items
}

export async function GetDaily(m3terId: string) {
  const { queryClient } = getContext();
  const data = await queryClient.fetchQuery({
    ...getDailyM3TerM3TerIdDailyGetOptions({
      client: m3terscanClient,
      path: { m3ter_id: Number(m3terId) },
    }),
  });

  return data;
}

export async function getDailyAP() {
  const data = await Promise.all([
    GetDaily("11"),
    GetDaily("12"),
    GetDaily("13"),
    GetDaily("14"),
    GetDaily("15"),
    GetDaily("16"),
    GetDaily("17"),
    GetDaily("18"),
    GetDaily("19"),
    GetDaily("20"),
    GetDaily("21"),
  ]);
  return data;
}

export async function getTotalEnergy() {
  const m3terIds = Array.from({ length: 11 }, (_, i) => 11 + i);

  const results = await Promise.all(
    m3terIds.map(async (id) => {
      const accountHex = await readContract(config, {
        abi,
        address: rollupContract.address,
        functionName: "account",
        args: [BigInt(id)],
      });

      const account = hexToNumber(accountHex as `0x${string}`);
      return account / 1_000_000;
    })
  );

  const totalAccount = results.reduce((sum, val) => sum + val, 0);
  return totalAccount;
}

export const m3terscanClient = createClient({
  baseUrl: import.meta.env.VITE_API_URL,
});
