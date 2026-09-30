/**
 * LOOP:
 * WEDGE:     Trade $LUNCH; fees buy Mag7 stocks for holders
 * BASKET:    AAPL MSFT GOOGL AMZN META NVDA TSLA (equal split, locked)
 * FEE:       trade fees → Seventa treasury
 * BUY:       treasury buys all seven when cycle triggers
 * PAYOUT:    pro-rata pieces of all seven — no stake, no claim
 * PROOF:     Featured $LUNCH + Distributions with 7 stock pills
 * CUSTODY:   Robinhood Chain · verified factory/router/locker/escrow
 * PAIR:      ETH
 * DIFFERENTIATOR: Mag7 meme + lunch tray; not $CHIPS (semis) or $ELONCOIN (TSLA only)
 */

export type StockLeg = {
  ticker: string
  name: string
  color: string
  logoUrl: string
  domain: string
}

export type CrateToken = {
  id: string
  name: string
  symbol: string
  pair: string
  basket: StockLeg[]
  marketCapUsd: number | null
  volume24hUsd: number | null
  address: string
  createdAt: string
  status: 'new' | 'graduated' | 'featured'
  tags: string[]
  blurb: string
  imageUrl: string
}

export type DistributionCycle = {
  id: string
  tokenId: string
  timeUtc: string
  stocksPaid: { ticker: string; amount: number; color: string; logoUrl: string }[]
  holdersPaid: number
  feesIn: { amount: number; asset: string }
  explorerUrl?: string
}

export type VerifiedContract = {
  name: string
  role: string
  address: string
  verified: boolean
}

/** Local SVGs — bundled with the site, load instantly (no CDN). */
function stock(
  ticker: string,
  name: string,
  color: string,
  domain: string,
): StockLeg {
  return {
    ticker,
    name,
    color,
    domain,
    logoUrl: `/stocks/${ticker}.svg?v=2`,
  }
}

export const MAG7: StockLeg[] = [
  stock('AAPL', 'Apple Inc.', '#A2AAAD', 'apple.com'),
  stock('MSFT', 'Microsoft Corp.', '#00A4EF', 'microsoft.com'),
  stock('GOOGL', 'Alphabet Inc.', '#4285F4', 'google.com'),
  stock('AMZN', 'Amazon.com Inc.', '#FF9900', 'amazon.com'),
  stock('META', 'Meta Platforms', '#0668E1', 'meta.com'),
  stock('NVDA', 'NVIDIA Corp.', '#76B900', 'nvidia.com'),
  stock('TSLA', 'Tesla, Inc.', '#E31937', 'tesla.com'),
]

export const LUNCH_CA = '0x7a3f9C2eB1d84E6A5F0cD9a12b4e8F6d3A91c0B2'
export const TREASURY_CA = '0xDcd1536F3F6e5b6a139fE35836D26a86955eF291'

export const ROBINHOOD_CHAIN = {
  chainId: 4663,
  chainIdHex: '0x1237',
  chainName: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'],
  blockExplorerUrls: ['https://robinhoodchain.blockscout.com'],
} as const

export const LUNCH: CrateToken = {
  id: 'lunch',
  name: 'Seventa Lunch',
  symbol: 'LUNCH',
  pair: 'ETH',
  basket: MAG7,
  marketCapUsd: 128_400,
  volume24hUsd: 41_200,
  address: LUNCH_CA,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
  status: 'featured',
  tags: ['CURVE', 'V2', 'RWA'],
  blurb: 'Mag7 on a lunch tray — trade $LUNCH, holders get all seven.',
  imageUrl: '/covers/lunch.png?v=5',
}

const CHIP_BASKET: StockLeg[] = [
  stock('NVDA', 'NVIDIA', '#76B900', 'nvidia.com'),
  stock('AMD', 'AMD', '#ED1C24', 'amd.com'),
  stock('INTC', 'Intel', '#0071C5', 'intel.com'),
  stock('MU', 'Micron', '#1E3A8A', 'micron.com'),
]

export const TOKENS: CrateToken[] = [
  LUNCH,
  {
    id: 'chips-ref',
    name: 'Chips Party Pack',
    symbol: 'CHIPS',
    pair: 'ETH',
    basket: CHIP_BASKET,
    marketCapUsd: 54_200,
    volume24hUsd: 18_900,
    address: '0x91b2c4d0e8f7a65b3c1d9e0f4a2b8c7d6e5f4012',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'new',
    tags: ['CURVE', 'V2'],
    blurb: 'Sector meme — semis only. Seventa is the whole Mag7 club.',
    imageUrl: '/covers/chips.png',
  },
  {
    id: 'elon-ref',
    name: 'Eloncoin',
    symbol: 'ELONCOIN',
    pair: 'ETH',
    basket: [stock('TSLA', 'Tesla', '#E31937', 'tesla.com')],
    marketCapUsd: 22_100,
    volume24hUsd: 9_400,
    address: '0x55e0a1b9c3d7f82e4a6b0c1d8e9f2a3b4c5d6071',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    status: 'new',
    tags: ['CURVE', 'V2'],
    blurb: 'Single-name TSLA. Seventa pays the full lunch tray.',
    imageUrl: '/covers/eloncoin.png',
  },
  {
    id: 'tank-ref',
    name: 'TANK',
    symbol: 'TANK',
    pair: 'ETH',
    basket: [],
    marketCapUsd: 31_800,
    volume24hUsd: 12_400,
    address: '0x80ae70cfcb6725ea7f5ace439eb3e56518131299',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    status: 'new',
    tags: ['CURVE', 'V2'],
    blurb: 'Context meme on Robinhood Chain — Seventa is the Mag7 lunch.',
    imageUrl: '/covers/tank.png',
  },
  {
    id: 'omnirail-ref',
    name: 'OmniRail',
    symbol: 'OMNIRAIL',
    pair: 'ETH',
    basket: [],
    marketCapUsd: 19_600,
    volume24hUsd: 7_200,
    address: '0xa4ddf100e3e0d3a9dd897e89d025622b794f0c08',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: 'new',
    tags: ['CURVE', 'V2'],
    blurb: 'Context meme on Robinhood Chain — Seventa is the Mag7 lunch.',
    imageUrl: '/covers/omnirail.png',
  },
  {
    id: 'doubt-ref',
    name: 'Doubt',
    symbol: 'DOUBT',
    pair: 'ETH',
    basket: [],
    marketCapUsd: 14_200,
    volume24hUsd: 5_800,
    address: '0x654db4c3dc1917693f571cc4121debd785718cd7',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    status: 'new',
    tags: ['CURVE', 'V2'],
    blurb: 'Context meme on Robinhood Chain — Seventa is the Mag7 lunch.',
    imageUrl: '/covers/doubt.png',
  },
]

export const FEATURED = TOKENS.filter((t) => t.status === 'featured' || t.id === 'lunch')

function mag7Pays(seed: number) {
  return MAG7.map((s, i) => ({
    ticker: s.ticker,
    amount: Number((0.0012 + ((seed + i) % 7) * 0.00035).toFixed(4)),
    color: s.color,
    logoUrl: s.logoUrl,
  }))
}

export const DISTRIBUTIONS: DistributionCycle[] = [
  {
    id: 'd1',
    tokenId: 'lunch',
    timeUtc: '18:40 UTC — today',
    stocksPaid: mag7Pays(3),
    holdersPaid: 47,
    feesIn: { amount: 0.0184, asset: 'ETH' },
    explorerUrl: `${ROBINHOOD_CHAIN.blockExplorerUrls[0]}/tx/0xdemo1`,
  },
  {
    id: 'd2',
    tokenId: 'lunch',
    timeUtc: '12:05 UTC — today',
    stocksPaid: mag7Pays(1),
    holdersPaid: 41,
    feesIn: { amount: 0.0112, asset: 'ETH' },
    explorerUrl: `${ROBINHOOD_CHAIN.blockExplorerUrls[0]}/tx/0xdemo2`,
  },
  {
    id: 'd3',
    tokenId: 'lunch',
    timeUtc: '21:22 UTC — yesterday',
    stocksPaid: mag7Pays(5),
    holdersPaid: 38,
    feesIn: { amount: 0.0097, asset: 'ETH' },
  },
]

export const CONTRACTS: VerifiedContract[] = [
  {
    name: 'Seventa Launch Factory',
    role: 'Deploys $LUNCH curve launches paired to ETH on Robinhood Chain.',
    address: '0x7ed51a2b9c0d4e6f8a1b3c5d7e9f0a2b4c6d8ec7e',
    verified: true,
  },
  {
    name: 'Seventa Launch Router',
    role: 'Atomic developer buys in the same tx as launch.',
    address: '0x2c4e8a0f1d3b5c7e9a1b3d5f7e9c1a3b5d7e9f01',
    verified: true,
  },
  {
    name: 'Seventa LP Locker',
    role: 'Holds graduated Uniswap v4 positions. No withdrawal function.',
    address: '0x9f1a3c5e7b9d2f4a6c8e0b2d4f6a8c0e2b4d6f81',
    verified: true,
  },
  {
    name: 'Seventa Fee Escrow',
    role: 'Creator-fee share accumulates until treasury sweep into Mag7 buys.',
    address: TREASURY_CA,
    verified: true,
  },
]

export function truncateAddress(addr: string, left = 6, right = 4) {
  if (addr.length <= left + right + 2) return addr
  return `${addr.slice(0, left)}…${addr.slice(-right)}`
}

export function formatUsd(n: number | null) {
  if (n == null) return '—'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}k`
  return `$${n.toFixed(0)}`
}

export function relativeTime(iso: string) {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 48) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

export function tokenById(id: string) {
  return TOKENS.find((t) => t.id === id)
}
