import { Link } from 'react-router-dom'
import type { CrateToken } from '../data/product'
import { relativeTime, truncateAddress } from '../data/product'
import { StockRow } from './StockLogo'

export function CrateCard({
  token,
  featured = false,
}: {
  token: CrateToken
  featured?: boolean
}) {
  return (
    <Link
      to="/pulse"
      className={`group block overflow-hidden rounded-3xl border bg-[#0a0a0a] transition hover:border-[#7EB8DC]/35 ${
        featured ? 'border-[#7EB8DC]/40' : 'border-white/10'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={token.imageUrl}
          alt={token.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {token.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        {token.basket.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <StockRow stocks={token.basket} size={28} />
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-[15px] font-semibold text-white">{token.name}</p>
          <p className="text-[13px] text-white/50">${token.symbol}</p>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
          <span>{truncateAddress(token.address)}</span>
          <span>{relativeTime(token.createdAt)}</span>
        </div>
      </div>
    </Link>
  )
}
