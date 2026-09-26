import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StockRow } from '../components/StockLogo'
import { TOKENS } from '../data/product'

export function PulsePage() {
  const [index, setIndex] = useState(0)
  const total = TOKENS.length
  const token = TOKENS[index]

  function prev() {
    setIndex((i) => (i - 1 + total) % total)
  }
  function next() {
    setIndex((i) => (i + 1) % total)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#7EB8DC] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7EB8DC]" />
        The Pulse
      </p>
      <h1 className="text-[40px] font-extrabold tracking-tight md:text-[52px]">What's now</h1>
      <p className="mt-2 max-w-xl text-[14px] text-white/55">
        Live board of trays on Robinhood Chain. $LUNCH is the Mag7 lunch — everything else is
        context.
      </p>

      <div className="mt-12 flex items-end justify-center gap-4 overflow-x-auto pb-4">
        {TOKENS.map((t, i) => {
          const active = i === index
          const offset = i - index
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative w-[240px] shrink-0 overflow-hidden rounded-3xl border text-left transition md:w-[280px] ${
                active
                  ? 'scale-105 border-[#7EB8DC] shadow-[0_0_40px_rgba(126,184,220,0.22)]'
                  : 'scale-95 border-white/10 opacity-55'
              }`}
              style={{ transform: `translateY(${Math.abs(offset) * 8}px)` }}
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-3 left-3">
                  <StockRow stocks={t.basket} size={30} />
                </div>
              </div>
              <div className="space-y-2 border-t border-white/5 bg-[#0a0a0a] p-4">
                <p className="font-semibold text-white">
                  {t.name} <span className="text-white/45">${t.symbol}</span>
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-white/15 p-2 text-white"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-mono text-[13px] text-white/50">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={next}
          className="rounded-full border border-white/15 p-2 text-white"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
        <Link
          to="/distributions"
          className="ml-2 text-[13px] font-semibold tracking-wide text-[#7EB8DC]"
        >
          VIEW TOKEN →
        </Link>
      </div>

      <p className="mt-10 text-center text-[12px] tracking-wider text-white/35 uppercase">
        Scroll for the full board ↓
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOKENS.map((t) => (
          <div
            key={`board-${t.id}`}
            className={`rounded-2xl border p-4 ${
              t.symbol === 'LUNCH' ? 'border-[#7EB8DC]/40 bg-[#7EB8DC]/5' : 'border-white/10'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">
                {t.name} <span className="text-white/45">${t.symbol}</span>
              </p>
              <StockRow stocks={t.basket} size={22} />
            </div>
            {token.id === t.id && (
              <p className="mt-2 text-[11px] text-white/40">{t.blurb}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
