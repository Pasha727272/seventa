import { useState } from 'react'
import type { StockLeg } from '../data/product'

/** Instant local logos from /public/stocks — no network. */
export function StockLogo({
  stock,
  size = 28,
  className = '',
}: {
  stock: Pick<StockLeg, 'ticker' | 'color' | 'logoUrl' | 'name'>
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white shadow-sm ${className}`}
      style={{ width: size, height: size }}
      title={stock.name ?? stock.ticker}
    >
      {!failed ? (
        <img
          src={stock.logoUrl}
          alt={stock.ticker}
          width={size}
          height={size}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-bold text-white"
          style={{ background: stock.color, fontSize: size * 0.28 }}
        >
          {stock.ticker.slice(0, 2)}
        </span>
      )}
    </span>
  )
}

export function StockRow({
  stocks,
  size = 26,
}: {
  stocks: Pick<StockLeg, 'ticker' | 'color' | 'logoUrl' | 'name'>[]
  size?: number
}) {
  return (
    <div className="flex items-center -space-x-1.5">
      {stocks.map((s) => (
        <StockLogo key={s.ticker} stock={s} size={size} />
      ))}
    </div>
  )
}
