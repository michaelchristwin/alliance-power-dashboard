import z from "zod";
import { getContext } from "@/integrations/client";
import { createServerFn } from "@tanstack/react-start";
import { DuneClient } from "@duneanalytics/client-sdk";
import { getLastDayOfPreviousMonthUTC } from "@/lib/utils";
import { getUnixTime } from "date-fns";
import { queryOptions } from "@tanstack/react-query";
import { Configuration, MeterApi, ProposalApi } from "@/api-sdk";

const dune = new DuneClient(process.env.DUNE_API_KEY || "");

const config = new Configuration({
  basePath: import.meta.env.VITE_API_URL || "",
});
const meterApi = new MeterApi(config);
const proposalApi = new ProposalApi(config);

const meterQueries = {
  getDaily: (meterId: number) =>
    queryOptions({
      queryKey: ["getDaily", meterId],
      queryFn: () =>
        meterApi.getDailyMeterMeterIdDailyGet(meterId).then((r) => r.data),
    }),

  getMonthOfYear: (meterId: number, year: number, month: number) =>
    queryOptions({
      queryKey: ["getMonthOfYear", meterId, year, month],
      queryFn: () =>
        meterApi
          .getMonthOfYearMeterMeterIdMonthMonthYearGet(meterId, year, month)
          .then((r) => r.data),
    }),

  getWeeksOfYear: (meterId: number, year: number) =>
    queryOptions({
      queryKey: ["getWeeksOfYear", meterId, year],
      queryFn: () =>
        meterApi
          .getWeeksOfYearMeterMeterIdWeeksYearGet(meterId, year)
          .then((r) => r.data),
    }),

  getActivities: (meterId: number, after?: string, limit?: number) =>
    queryOptions({
      queryKey: ["getActivities", meterId, after, limit],
      queryFn: () =>
        meterApi
          .getActivitiesMeterMeterIdActivitiesGet(meterId, after, limit)
          .then((r) => r.data),
    }),
};

const proposalQueries = {
  getProposals: (txHash: string) =>
    queryOptions({
      queryKey: ["getProposals", txHash],
      queryFn: () =>
        proposalApi.getProposalProposalTxHashGet(txHash).then((r) => r.data),
    }),
};

const propsSchema = z.array(z.number().int());

async function GetDaily(meterIds: number[]) {
  const { queryClient } = getContext();

  const data = await Promise.all(
    meterIds.map((meterId) =>
      queryClient.fetchQuery(meterQueries.getDaily(meterId)),
    ),
  );

  return data;
}

const getServerAccounts = createServerFn({ method: "GET" })
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

    if (!startRow.length || !latestRow) {
      throw new Error("Missing rows for proposal lookup");
    }

    const [headProposal, latestProposal] = await Promise.all([
      queryClient.fetchQuery(
        proposalQueries.getProposals(startRow[0].hash as string),
      ),
      queryClient.fetchQuery(
        proposalQueries.getProposals(latestRow.hash as string),
      ),
    ]);

    const latestAccount = latestProposal
      .filter((proposal) => data.includes(proposal.m3ter_no))
      .reduce((sum, val) => sum + Number(val.account), 0);
    const headaccount = headProposal
      .filter((proposal) => data.includes(proposal.m3ter_no))
      .reduce((sum, val) => sum + Number(val.account), 0);

    return Math.max(latestAccount - headaccount, 0);
  });

const getServerMonthly = createServerFn({ method: "GET" })
  .inputValidator(propsSchema)
  .handler(async ({ data }) => {
    const { queryClient } = getContext();
    const d = new Date();
    const monthData = await Promise.all(
      data.map((id) => {
        return queryClient.fetchQuery(
          meterQueries.getMonthOfYear(
            id,
            d.getMonth() + 1,
            d.getFullYear() + 1,
          ),
        );
      }),
    );

    return monthData;
  });

const fetchSession = createServerFn({ method: "POST" }).handler(async () => {
  const response = await fetch("https://api.daimo.com/v1/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DAIMO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination: {
        type: "evm",
        address: "0xyourAddress",
        chainId: 8453,
        tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913s",
        amountUnits: "10.00",
      },
      display: {
        title: "Deposit to Michael",
        verb: "Deposit",
      },
    }),
  });
  const { session } = await response.json();
  return session;
});

export {
  GetDaily,
  getServerAccounts,
  getServerMonthly,
  fetchSession,
  meterQueries,
  proposalQueries,
};
