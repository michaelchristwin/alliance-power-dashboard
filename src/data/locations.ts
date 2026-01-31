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
  "sunbox-agy": {
    title: "Sunbox AGY",
    meterIds: [22, 23],
  },
  "sunbox-halibiz": {
    title: "Sunbox Halibiz",
    meterIds: [24, 25],
  },
  "sunbox-abzat": {
    title: "SunBox ABZAT",
    meterIds: [26, 27],
  },
  "sunbox-tala": {
    title: "SunBox Tala",
    meterIds: [28],
  },
  "sunbox-nsuk": {
    title: "SunBox Nsuk",
    meterIds: [29],
  },
} as const;

export type LocationKey = keyof typeof locationData;
