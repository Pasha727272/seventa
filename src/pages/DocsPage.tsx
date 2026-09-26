import { useState } from 'react'
import { Check } from 'lucide-react'
import { CopyAddress } from '../components/CopyAddress'
import { StockLogo } from '../components/StockLogo'
import { CONTRACTS, MAG7, truncateAddress } from '../data/product'

const LOOP = [
  {
    n: '01',
    title: 'Pick a pair and a payout',
    body: 'Seventa locks Mag7 at launch — Apple, Microsoft, Google, Amazon, Meta, Nvidia, Tesla. Equal split, creator-signed.',
    tag: 'CREATOR-SIGNED · LOCKED IN',
  },
  {
    n: '02',
    title: 'Fees route to the treasury',
    body: 'Creator-fee share from every $LUNCH trade goes to the Seventa treasury on Robinhood Chain — not a private wallet.',
    tag: 'TREASURY · AUTOMATED',
  },
  {
    n: '03',
    title: 'The treasury buys the stocks',
    body: 'When a cycle triggers, fees buy all seven stocks with an equal split and a live liquidity depth check.',
    tag: 'EQUAL SPLIT · DEPTH-CHECKED',
  },
  {
    n: '04',
    title: 'Holders of that coin get paid',
    body: 'Pro-rata pieces of all seven land for holders automatically — no staking, no claim button.',
    tag: 'PRO-RATA · NO CLAIM',
  },
] as const

export function DocsPage() {
  const [mode, setMode] = useState<'rwa' | 'creator'>('rwa')

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white/50">
          · SEVENTA · MAG7 LUNCH
        </span>
        <div className="flex rounded-full bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode('rwa')}
            className={`rounded-full px-4 py-1.5 text-[12px] font-bold ${
              mode === 'rwa' ? 'bg-[#7EB8DC] text-[#061018]' : 'text-white/55'
            }`}
          >
            RWA Launch
          </button>
          <button
            type="button"
            onClick={() => setMode('creator')}
            className={`rounded-full px-4 py-1.5 text-[12px] font-bold ${
              mode === 'creator' ? 'bg-[#7EB8DC] text-[#061018]' : 'text-white/55'
            }`}
          >
            Creator Launch
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-[36px] leading-tight font-extrabold tracking-tight md:text-[48px]">
          {mode === 'rwa'
            ? 'Launch a coin that pays its holders in stocks.'
            : 'Launch a coin that keeps creator fees with you.'}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-white/60">
          {mode === 'rwa' ? (
            <>
              Trade $LUNCH → fees accumulate → the treasury buys all seven Mag7 stocks equally →
              holders receive pieces of all seven. No staking. No claims. Every step on Robinhood
              Chain.
            </>
          ) : (
            <>
              Creator launches keep the fee wallet with the deployer. Seventa&apos;s Mag7 product
              uses RWA mode so the lunch tray pays holders instead.
            </>
          )}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-[28px] font-bold">The loop</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LOOP.map((step) => (
            <article
              key={step.n}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <span className="pointer-events-none absolute right-3 bottom-0 text-[72px] font-black text-white/[0.04]">
                {step.n}
              </span>
              <p className="text-[12px] font-semibold text-white/35">/ {step.n}</p>
              <h3 className="mt-3 text-[16px] font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{step.body}</p>
              <p className="mt-6 text-[10px] font-bold tracking-wider text-white/40">{step.tag}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] bg-[#7EB8DC] px-6 py-10 text-[#061018] md:px-10">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase">Hands-off by design</p>
        <p className="mt-3 max-w-3xl text-[22px] leading-snug font-bold md:text-[28px]">
          Pair $LUNCH with ETH on Robinhood Chain. The Mag7 lunch tray is locked. The treasury buys
          them with the fees and pays your holders automatically.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {MAG7.map((s) => (
            <div
              key={s.ticker}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/90 p-3 shadow-sm"
            >
              <StockLogo stock={s} size={36} />
              <p className="text-[12px] font-bold">{s.ticker}</p>
              <p className="text-center text-[10px] text-black/50">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-[28px] font-bold">Verified Contracts</h2>
          <a
            href="https://robinhoodchain.blockscout.com"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-bold tracking-wider text-white/45 uppercase hover:text-[#7EB8DC]"
          >
            Explorer ↗
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {CONTRACTS.map((c, i) => (
            <div
              key={c.address}
              className={`flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between ${
                i < CONTRACTS.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <div>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="mt-1 max-w-xl text-[13px] text-white/45">{c.role}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CopyAddress address={c.address} label="" />
                {c.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#7EB8DC]/15 px-2.5 py-1 text-[11px] font-bold text-[#7EB8DC]">
                    <Check size={12} /> VERIFIED
                  </span>
                )}
                <span className="font-mono text-[11px] text-white/30 md:hidden">
                  {truncateAddress(c.address)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
