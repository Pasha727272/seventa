import { MAG7 } from '../data/product'
import { BrandMark } from './BrandMark'
import { StockLogo } from './StockLogo'

/** Evenly spaced orbit around a perfectly centered hub */
function orbitStyle(index: number, total: number) {
  const angle = (-90 + (index * 360) / total) * (Math.PI / 180)
  const radius = 38
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${48 + radius * Math.sin(angle)}%`,
  }
}

export function Mag7Tray() {
  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col items-center">
      <div className="relative aspect-square w-full">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7EB8DC]/15 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 z-10 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#7EB8DC]/35 bg-gradient-to-b from-[#0c1218] to-black shadow-[0_0_60px_rgba(126,184,220,0.25)]">
          <BrandMark size={52} className="mb-1.5 rounded-2xl" />
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#7EB8DC]">SEVENTA</p>
          <p className="mt-0.5 text-[12px] font-semibold text-white">$LUNCH · Mag7</p>
        </div>

        {MAG7.map((stock, i) => (
          <div
            key={stock.ticker}
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={orbitStyle(i, MAG7.length)}
          >
            <div className="rounded-full bg-black p-1 ring-1 ring-white/10">
              <StockLogo stock={stock} size={44} />
            </div>
            <p className="mt-1 text-center text-[10px] font-semibold tracking-wide text-white/70">
              {stock.ticker}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {['LOCKED LP', 'PRO-RATA', 'ON-CHAIN'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
