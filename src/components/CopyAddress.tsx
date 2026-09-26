import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { truncateAddress } from '../data/product'

export function CopyAddress({
  address,
  label = 'CA',
  className = '',
}: {
  address: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onCopy()}
      title={address}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[12px] text-white/80 transition hover:border-[#7EB8DC]/40 hover:text-white ${className}`}
    >
      {label ? (
        <span className="text-[10px] font-semibold tracking-wider text-white/45 uppercase">
          {label}
        </span>
      ) : null}
      <span>{truncateAddress(address)}</span>
      {copied ? (
        <Check size={14} className="text-[#7EB8DC]" />
      ) : (
        <Copy size={14} className="text-white/50" />
      )}
    </button>
  )
}
