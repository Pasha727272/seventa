import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Search } from 'lucide-react'
import { CrateCard } from '../components/CrateCard'
import { Mag7Tray } from '../components/Mag7Tray'
import { FEATURED, TOKENS } from '../data/product'

const FILTERS = ['New', 'Volume', 'Market cap', 'Graduated'] as const

export function HomePage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('New')

  const list = useMemo(() => {
    let rows = [...TOKENS]
    const q = query.trim().toLowerCase()
    if (q) {
      rows = rows.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q) ||
          t.address.toLowerCase().includes(q),
      )
    }
    if (filter === 'Volume') rows.sort((a, b) => (b.volume24hUsd ?? 0) - (a.volume24hUsd ?? 0))
    if (filter === 'Market cap') rows.sort((a, b) => (b.marketCapUsd ?? 0) - (a.marketCapUsd ?? 0))
    if (filter === 'Graduated') rows = rows.filter((t) => t.status === 'graduated')
    if (filter === 'New') rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    return rows
  }, [query, filter])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-left lg:pr-4">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white/60 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7EB8DC]" />
            Built natively for Robinhood Chain
          </p>

          <h1 className="max-w-[16ch] text-[40px] leading-[1.05] font-extrabold tracking-tight md:text-[56px]">
            Skip the single stock.{' '}
            <span className="text-[#7EB8DC]">Buy the whole Mag7 lunch.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">
            Seventa is the Magnificent Seven — Apple, Microsoft, Google, Amazon, Meta, Nvidia,
            Tesla. Instead of picking one stock for lunch, you buy the whole tray. $LUNCH is the
            meme for the retail investor whose portfolio is Big Tech on a lunch tray.
          </p>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/55">
            Trade $LUNCH → fees accumulate → the treasury buys all seven stocks equally → holders
            receive pieces of all seven. No staking. No claims.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/launch"
              className="inline-flex items-center gap-2 rounded-full bg-[#7EB8DC] px-5 py-3 text-[13px] font-bold text-[#061018]"
            >
              Launch a token
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/pulse"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[13px] font-semibold text-white"
            >
              Feel the pulse →
            </Link>
          </div>

          <ul className="mt-8 space-y-2 text-[13px] text-white/50">
            <li>· Mag7 is already a finance meme — everyone knows the club.</li>
            <li>· Lunch tray is clear: not one stock, a full meal.</li>
            <li>· Unlike $CHIPS (semis) or $ELONCOIN (Tesla only) — the whole Big Tech set.</li>
          </ul>
        </div>

        <div className="flex w-full justify-center">
          <Mag7Tray />
        </div>
      </section>

      <section className="mt-16 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-white/35"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tokens by name, symbol or address"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pr-4 pl-11 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#7EB8DC]/50"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-2 text-[12px] font-semibold ${
                  filter === f
                    ? 'bg-white/15 text-white'
                    : 'border border-white/10 text-white/55 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
            <Link
              to="/launch"
              className="inline-flex items-center gap-1 rounded-full bg-[#7EB8DC] px-3.5 py-2 text-[12px] font-bold text-[#061018]"
            >
              <Plus size={14} /> Create
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="text-[28px] font-bold">
            Featured
            <sup className="ml-1 text-[14px] text-white/40">{FEATURED.length}</sup>
          </h2>
          <p className="mt-1 text-[13px] text-white/45">
            Tokens hand-picked into the Mag7 lunch tray.
          </p>
        </div>
        <div className="mx-auto flex max-w-5xl justify-center">
          {FEATURED.map((token) => (
            <div key={token.id} className="w-full max-w-sm">
              <CrateCard token={token} featured />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 text-center">
          <h2 className="text-[28px] font-bold">
            Board
            <sup className="ml-1 text-[14px] text-white/40">{list.length}</sup>
          </h2>
          <p className="mt-1 text-[13px] text-white/45">
            $LUNCH vs sector / single-name memes — same shell, different baskets.
          </p>
        </div>
        {list.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
            No crates match that search.
          </p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((token) => (
              <CrateCard key={token.id} token={token} featured={token.symbol === 'LUNCH'} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
