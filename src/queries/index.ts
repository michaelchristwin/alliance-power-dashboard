import { graphql } from "../graphql";
import { getContext } from "@/integrations/client";
import { createServerFn } from "@tanstack/react-start";
import { getLastDayOfPreviousMonthUTC } from "@/lib/utils";
import { getUnixTime } from "date-fns";
import { queryOptions } from "@tanstack/react-query";
import { Configuration, MeterApi, ProposalApi } from "@/api-sdk";

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

async function GetDaily(meterIds: number[]) {
  const { queryClient } = getContext();

  const data = await Promise.all(
    meterIds.map((meterId) =>
      queryClient.fetchQuery(meterQueries.getDaily(meterId)),
    ),
  );

  return data;
}
export const commitsQueryByBlocktime = graphql(`
  query CommitsList($limit: Int = 10, $offset: Int = 0, $blockTime: BigInt!) {
    commits(
      limit: $limit
      offset: $offset
      orderBy: "blockTime"
      orderDirection: "DESC"
      where: { blockTime_gte: $blockTime }
    ) {
      items {
        txHash
        blockTime
        sender
        chainLength
        state {
          items {
            meterNo
            account
            nonce
          }
        }
      }
      totalCount
    }
  }
`);
export const commitsQuery = graphql(`
  query CommitsList($limit: Int = 10, $offset: Int = 0) {
    commits(
      limit: $limit
      offset: $offset
      orderBy: "blockTime"
      orderDirection: "DESC"
    ) {
      items {
        txHash
        blockTime
        sender
        chainLength
        state {
          items {
            meterNo
            account
            nonce
          }
        }
      }
      totalCount
    }
  }
`);

async function getAccounts({ input }: { input: number[] }) {
  const { urqlClient } = getContext();
  const { data, error } = await urqlClient
    .query(commitsQueryByBlocktime, {
      blockTime: BigInt(getUnixTime(getLastDayOfPreviousMonthUTC())),
      limit: 1,
    })
    .toPromise();
  if (error) {
    throw Error(error.message);
  }

  if (!data) {
    throw new Error("No result found");
  }
  const previousCommit = data.commits.items[0];
  const { data: latestData, error: _error } = await urqlClient
    .query(commitsQuery, {
      limit: 1,
    })
    .toPromise();
  if (_error) {
    throw Error(_error.message);
  }
  if (!latestData) {
    throw new Error("No result found");
  }

  const latestCommit = latestData.commits.items[0];

  const latestAccount = latestCommit.state?.items
    .filter((proposal) => input.includes(proposal.meterNo))
    .reduce((sum, val) => sum + Number(val.account), 0);
  const headaccount = previousCommit.state?.items
    .filter((proposal) => input.includes(proposal.meterNo))
    .reduce((sum, val) => sum + Number(val.account), 0);
  if (!headaccount) throw Error("Account for last month is undefined");
  if (!latestAccount) throw Error("Latest account is undefined");

  return Math.max(latestAccount - headaccount, 0);
}

async function getMonthly({ input }: { input: number[] }) {
  const { queryClient } = getContext();
  const date = new Date();
  const monthData = await Promise.all(
    input.map((id) => {
      return queryClient.fetchQuery(
        meterQueries.getMonthOfYear(
          id,
          date.getMonth() + 1,
          date.getFullYear() + 1,
        ),
      );
    }),
  );

  return monthData;
}

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
  getAccounts,
  getMonthly,
  fetchSession,
  meterQueries,
  proposalQueries,
};
