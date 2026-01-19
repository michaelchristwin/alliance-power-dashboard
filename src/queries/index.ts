import z from "zod";
import {
  getDailyM3TerM3TerIdDailyGetOptions,
  getProposalProposalTxHashGetOptions,
} from "@/api-client/@tanstack/react-query.gen";
import { createClient } from "@/api-client/client";
import { getContext } from "@/integrations/client";
import { createServerFn } from "@tanstack/react-start";
import { DuneClient } from "@duneanalytics/client-sdk";
import { getLastDayOfPreviousMonthUTC } from "@/lib/utils";
import { getUnixTime } from "date-fns";

const dune = new DuneClient(process.env.DUNE_API_KEY || "");

export async function GetMonthly(m3terId: string) {
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i); // 0–11 inclusive

  const responses = await Promise.all(
    months.map(async (month) => {
      const response = await fetch(
        `http://localhost:8080/m3ter/${m3terId}/months/${year}/${month}`,
      );
      return response.json();
    }),
  );

  return responses; // array of 12 items
}

export async function GetDaily(meterIds: number[]) {
  const { queryClient } = getContext();

  const data = await Promise.all(
    meterIds.map((meterId) =>
      queryClient.fetchQuery({
        ...getDailyM3TerM3TerIdDailyGetOptions({
          client: m3terscanClient,
          path: { m3ter_id: meterId },
        }),
      }),
    ),
  );

  return data;
}

export const m3terscanClient = createClient({
  baseUrl: import.meta.env.VITE_API_URL,
});

const propsSchema = z.array(z.number().int());

export const getServerAccounts = createServerFn({ method: "GET" })
  .inputValidator(propsSchema)
  .handler(async ({ data }) => {
    const { queryClient } = getContext();
    const { result, error } = await dune.getLatestResult({ queryId: 5911866 });

    if (error || !result) {
      throw new Error(error?.message || "No result found");
    }

    const startRow = result.rows
      .filter(
        (row) =>
          getUnixTime(new Date(row.block_time as string)) >=
          getUnixTime(getLastDayOfPreviousMonthUTC()),
      )
      .sort(
        (a, b) =>
          getUnixTime(new Date(a.block_time as string)) -
          getUnixTime(new Date(b.block_time as string)),
      );

    const latestRow = result.rows[result.rows.length - 1];
    // console.log("Start Row", startRow[0]);
    // console.log("Latest Row: ", latestRow);
    if (!startRow.length || !latestRow) {
      throw new Error("Missing rows for proposal lookup");
    }

    const [headProposal, latestProposal] = await Promise.all([
      queryClient.fetchQuery({
        ...getProposalProposalTxHashGetOptions({
          client: m3terscanClient,
          path: {
            tx_hash: startRow[0].hash as string,
          },
        }),
      }),
      queryClient.fetchQuery({
        ...getProposalProposalTxHashGetOptions({
          client: m3terscanClient,
          path: {
            tx_hash: latestRow.hash as string,
          },
        }),
      }),
    ]);

    const latestAccount = latestProposal
      .filter((proposal) => data.includes(proposal.m3ter_no))
      .reduce((sum, val) => sum + Number(val.account), 0);
    const headaccount = headProposal
      .filter((proposal) => data.includes(proposal.m3ter_no))
      .reduce((sum, val) => sum + Number(val.account), 0);

    return Math.max(latestAccount - headaccount, 0);
  });
