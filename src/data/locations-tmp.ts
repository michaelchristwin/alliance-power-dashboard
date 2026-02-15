export const tempLocationData = {
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

export type TempLocationKey = keyof typeof tempLocationData;
