export const locationData = {
  "glisten-academy": {
    title: "Glisten Academy",
    meterIds: [11, 12, 13],
  },
  "great-heights": {
    title: "Great Heights",
    meterIds: [15, 16, 17],
  },
  "apgc-office": {
    title: "APGC Office",
    meterIds: [18],
  },
  "prof-asokoro": {
    title: "Prof Asokoro",
    meterIds: [19, 20, 21],
  },
} as const;

export type LocationKey = keyof typeof locationData;
