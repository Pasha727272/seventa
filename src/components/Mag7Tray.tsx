import { MAG7 } from '../data/product'
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
        {/* Smooth CSS bloom — no image fringe / pixel glow */}
        <div className="crystal-ambient pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden />

        {/* Center crystal — no black circle; blue glow on hover */}
        <button
          type="button"
          className="crystal-hub absolute top-1/2 left-1/2 z-10 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0"
          aria-label="Seventa crystal"
        >
          <span className="crystal-hub-glow" aria-hidden />
          <img
            src="/crystal.png?v=6"
            alt=""
            className="crystal-hub-img relative z-[1] h-full w-full object-contain"
            draggable={false}
          />
        </button>

        {MAG7.map((stock, i) => (
          <div
            key={stock.ticker}
            className="orbit-stock absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={orbitStyle(i, MAG7.length)}
            role="img"
            aria-label={stock.name}
          >
            <span className="orbit-stock-glow" aria-hidden />
            <div className="orbit-stock-orb">
              <span className="orbit-stock-shine" aria-hidden />
              <span className="orbit-stock-rim" aria-hidden />
              <StockLogo stock={stock} size={51} className="orbit-stock-logo" />
            </div>
            <p className="orbit-stock-label mt-1.5 text-center text-[10px] font-semibold tracking-wide text-white/80">
              {stock.ticker}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {['LOCKED LP', 'PRO-RATA', 'ON-CHAIN'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/75 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
