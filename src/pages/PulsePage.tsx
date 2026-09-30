import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StockRow } from '../components/StockLogo'
import { TOKENS } from '../data/product'

export function PulsePage() {
  const [index, setIndex] = useState(0)
  const total = TOKENS.length

  function prev() {
    setIndex((i) => (i - 1 + total) % total)
  }
  function next() {
    setIndex((i) => (i + 1) % total)
  }

  const slots = [
    { token: TOKENS[(index - 1 + total) % total], role: 'side' as const, jump: prev },
    { token: TOKENS[index], role: 'active' as const, jump: undefined },
    { token: TOKENS[(index + 1) % total], role: 'side' as const, jump: next },
  ]

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

      <div className="mt-12 flex items-end justify-center gap-3 overflow-hidden md:gap-5">
        {slots.map(({ token: t, role, jump }) => {
          const active = role === 'active'
          return (
            <button
              key={`${role}-${t.id}`}
              type="button"
              onClick={jump}
              disabled={active}
              className={`relative shrink-0 overflow-hidden rounded-3xl border text-left transition duration-500 ${
                active
                  ? 'z-10 w-[260px] scale-105 cursor-default border-[#7EB8DC] opacity-100 shadow-[0_0_40px_rgba(126,184,220,0.25)] md:w-[300px]'
                  : 'w-[200px] translate-y-3 scale-95 border-white/10 opacity-40 hover:opacity-70 md:w-[240px]'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                {t.basket.length > 0 && (
                  <div className="absolute bottom-3 left-3">
                    <StockRow stocks={t.basket} size={active ? 30 : 24} />
                  </div>
                )}
              </div>
              <div className="space-y-1 border-t border-white/5 bg-[#0a0a0a] p-3 md:p-4">
                <p className={`font-semibold text-white ${active ? 'text-[15px]' : 'text-[13px]'}`}>
                  {t.name} <span className="text-white/45">${t.symbol}</span>
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-white/15 p-2.5 text-white transition hover:border-[#7EB8DC] hover:text-[#7EB8DC]"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-full border border-white/15 p-2.5 text-white transition hover:border-[#7EB8DC] hover:text-[#7EB8DC]"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
        <Link
          to="/distributions"
          className="ml-1 text-[13px] font-semibold tracking-wide text-[#7EB8DC]"
        >
          VIEW TOKEN →
        </Link>
      </div>
    </div>
  )
}
