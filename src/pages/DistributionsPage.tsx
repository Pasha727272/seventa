import { ArrowUpRight } from 'lucide-react'
import { BrandMark } from '../components/BrandMark'
import { StockLogo } from '../components/StockLogo'
import { DISTRIBUTIONS, tokenById } from '../data/product'

export function DistributionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <p className="text-[11px] font-bold tracking-[0.18em] text-[#7EB8DC] uppercase">
        RWA Distributions
      </p>
      <h1 className="mt-2 text-[36px] font-extrabold tracking-tight md:text-[44px]">
        All distributions
      </h1>
      <p className="mt-3 max-w-2xl text-[14px] text-white/55">
        Completed cycles where Mag7 stocks were bought from $LUNCH fees and holders paid from chain
        records — no staking, no claims.
      </p>

      <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-[#0a0a0a]">
        <table className="min-w-[880px] w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-white/10 text-[11px] tracking-wider text-white/40 uppercase">
              <th className="px-4 py-3 font-semibold">Token</th>
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Stocks paid</th>
              <th className="px-4 py-3 font-semibold">Holders paid</th>
              <th className="px-4 py-3 font-semibold">Fees in</th>
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTIONS.map((row) => {
              const token = tokenById(row.tokenId)
              return (
                <tr key={row.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <BrandMark size={36} className="rounded-full" />
                      <div>
                        <p className="font-semibold text-white">{token?.name ?? '—'}</p>
                        <p className="text-white/45">${token?.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-white/60">{row.timeUtc}</td>
                  <td className="px-4 py-4">
                    <div className="flex max-w-[360px] flex-wrap gap-1.5">
                      {row.stocksPaid.map((s) => (
                        <span
                          key={`${row.id}-${s.ticker}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black px-2 py-1 text-[11px] font-semibold"
                        >
                          <StockLogo
                            stock={{
                              ticker: s.ticker,
                              color: s.color,
                              logoUrl: s.logoUrl,
                              name: s.ticker,
                            }}
                            size={16}
                          />
                          {s.ticker}
                          <span className="text-white/45">{s.amount}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={row.explorerUrl ?? '#'}
                      className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#7EB8DC]"
                    >
                      {row.holdersPaid}
                      <ArrowUpRight size={14} className="text-white/40" />
                    </a>
                  </td>
                  <td className="px-4 py-4 font-mono text-white/70">
                    {row.feesIn.amount} {row.feesIn.asset}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
