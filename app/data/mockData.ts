export type Timeframe = 'monthly' | 'weekly' | 'daily'

export const energyData = {
  monthly: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    generated: [120, 150, 180, 210, 190, 240, 280, 260, 220, 200, 170, 190],
    minted: [100, 130, 160, 190, 170, 220, 250, 230, 200, 180, 150, 170],
  },
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    generated: [42, 38, 45, 50, 47, 40, 35],
    minted: [38, 35, 40, 45, 43, 36, 32],
  },
  daily: {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    generated: Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * 10) + 5,
    ),
    minted: Array.from(
      { length: 24 },
      (_) => Math.floor(Math.random() * 8) + 4,
    ),
  },
}

export const carbonData = {
  totalSaved: 12450,
  monthlyReduction: 420,
  equivalents: {
    trees: 320,
    carMiles: 28500,
    homeEnergy: 45,
  },
}

export const tokenBalances = {
  energy: 2450,
  carbon: 1280,
  stakingRewards: 175,
}

export const stakingOptions = [
  { id: 1, name: 'Conservative', apy: 4.5, lockPeriod: 30, minAmount: 100 },
  { id: 2, name: 'Balanced', apy: 7.2, lockPeriod: 90, minAmount: 250 },
  { id: 3, name: 'Growth', apy: 12.5, lockPeriod: 180, minAmount: 500 },
]

export const transactionHistory = Array.from({ length: 15 }, (_, i) => ({
  id: `tx-${i + 1}`,
  type: ['Mint', 'Transfer', 'Stake', 'Unstake', 'Reward'][
    Math.floor(Math.random() * 5)
  ],
  amount: Math.floor(Math.random() * 100) + 10,
  tokenType: Math.random() > 0.5 ? 'Energy' : 'Carbon',
  timestamp: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
  ).toISOString(),
  status: Math.random() > 0.1 ? 'Completed' : 'Pending',
}))
