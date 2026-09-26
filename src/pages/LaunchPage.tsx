import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ImagePlus, X } from 'lucide-react'
import { MAG7, TREASURY_CA, truncateAddress } from '../data/product'
import { useWallet } from '../lib/WalletContext'
import { CopyAddress } from '../components/CopyAddress'
import { StockLogo } from '../components/StockLogo'

export function LaunchPage() {
  const { address, openModal, isRobinhood, ensureRobinhood, connecting } = useWallet()
  const [rwa, setRwa] = useState(true)
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [desc, setDesc] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [telegram, setTelegram] = useState('')
  const [tax, setTax] = useState('1.00')
  const [devBuy, setDevBuy] = useState('')
  const [stocksOpen, setStocksOpen] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  function onPickImage(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(URL.createObjectURL(file))
  }

  function clearImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const taxNum = Number.parseFloat(tax) || 0

  async function onLaunch(e: React.FormEvent) {
    e.preventDefault()
    if (!address) {
      openModal()
      return
    }
    if (!isRobinhood) {
      try {
        await ensureRobinhood()
      } catch {
        setStatus('Switch your wallet to Robinhood Chain to launch.')
        return
      }
    }
    setStatus(
      rwa
        ? 'Connected on Robinhood Chain. Mag7 payout is locked — submit when contracts are live.'
        : 'Creator mode keeps fees with you. Enable RWA mode for Mag7 stock payouts.',
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <h1 className="text-[36px] font-extrabold tracking-tight md:text-[44px]">Launch a token</h1>

      <form
        onSubmit={(e) => void onLaunch(e)}
        className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-4 md:p-6 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <div className="relative w-full max-w-[220px]">
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={(e) => onPickImage(e.target.files?.[0])}
            />
            {imagePreview ? (
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-black">
                <img
                  src={imagePreview}
                  alt="Token art preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-x-2 bottom-2 rounded-full bg-black/70 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
                >
                  Change image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  onPickImage(e.dataTransfer.files?.[0])
                }}
                className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-black text-[13px] text-white/40 hover:border-[#7EB8DC]/40"
              >
                <ImagePlus size={28} className="text-white/30" />
                Upload image
              </button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name *">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Token"
                className={inputCls}
                required
              />
            </Field>
            <Field label="Symbol *">
              <input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="TKN"
                className={inputCls}
                required
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What's this token about?"
              rows={4}
              className={inputCls}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Website">
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
                className={inputCls}
              />
            </Field>
            <Field label="Twitter / X">
              <input
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="@handle"
                className={inputCls}
              />
            </Field>
            <Field label="Telegram">
              <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="t.me/"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Developer buy (optional)">
            <div className="relative">
              <input
                value={devBuy}
                onChange={(e) => setDevBuy(e.target.value)}
                placeholder="0.0"
                className={`${inputCls} pr-14`}
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[12px] font-semibold text-white/45">
                ETH
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">
              Bought from the curve in the launch transaction itself, so nobody can get in before
              you.
            </p>
          </Field>

          <Field label="Tax (optional)">
            <div className="relative">
              <input
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                placeholder="1.00"
                className={`${inputCls} pr-10`}
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[12px] font-semibold text-white/45">
                %
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">
              Traders pay {taxNum.toFixed(2)}% in total;{' '}
              {rwa ? taxNum.toFixed(2) : '0.00'}% of every trade is tax that goes to your holders
              with the rest of the fees. Up to 10%.
            </p>
          </Field>
        </div>

        {/* Right — economics */}
        <div className="flex flex-col space-y-4">
          <Field label="Trading pair">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black px-3 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#627EEA] text-[11px] font-bold text-white">
                ◆
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-white">ETH Ether</p>
              </div>
              <ChevronDown size={16} className="text-white/35" />
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">
              This asset is the curve trading and fee currency — buyers trade with it, and creator
              fees accrue in it.
            </p>
          </Field>

          <div className="rounded-2xl border border-[#7EB8DC]/30 bg-[#7EB8DC]/8 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={rwa}
                onChange={(e) => setRwa(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#7EB8DC]"
              />
              <span>
                <span className="block text-[14px] font-semibold text-white">RWA mode</span>
                <span className="mt-1 block text-[12px] text-white/55">
                  Turn trading fees into real-world asset stocks for your holders.
                </span>
              </span>
            </label>

            {rwa && (
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <p className="text-[12px] leading-relaxed text-white/55">
                  Fees get sent to the treasury wallet{' '}
                  <span className="font-mono text-[#A8D4EC]">
                    {truncateAddress(TREASURY_CA, 6, 4)}
                  </span>{' '}
                  — RWA tokens automatically get distributed to holders of this coin.
                </p>
                <CopyAddress address={TREASURY_CA} label="Treasury" />

                <div className="relative">
                  <p className="mb-1.5 text-[11px] font-semibold tracking-wider text-white/45 uppercase">
                    Stocks to distribute *
                  </p>
                  <button
                    type="button"
                    onClick={() => setStocksOpen((v) => !v)}
                    className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black px-3 py-3 text-left"
                  >
                    <div className="flex flex-1 flex-wrap gap-1.5">
                      {MAG7.map((s) => (
                        <span
                          key={s.ticker}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold"
                        >
                          <StockLogo stock={s} size={16} />
                          {s.ticker}
                        </span>
                      ))}
                    </div>
                    <ChevronDown size={16} className="shrink-0 text-white/35" />
                  </button>
                  {stocksOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-2xl border border-white/10 bg-[#111] p-2 shadow-xl">
                      <p className="px-2 py-1.5 text-[11px] text-white/40">
                        Mag7 locked for Seventa — equal split, not free-pick.
                      </p>
                      {MAG7.map((s) => (
                        <div
                          key={s.ticker}
                          className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5"
                        >
                          <StockLogo stock={s} size={28} />
                          <div>
                            <p className="text-[13px] font-semibold text-white">{s.ticker}</p>
                            <p className="text-[11px] text-white/40">{s.name}</p>
                          </div>
                          <span className="ml-auto text-[11px] text-[#7EB8DC]">Locked</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-3 pt-2">
            <button
              type="submit"
              disabled={connecting}
              className="w-full rounded-full bg-[#7EB8DC] py-3.5 text-[14px] font-bold tracking-wide text-[#061018] uppercase disabled:opacity-60"
            >
              {!address ? 'Connect wallet' : !isRobinhood ? 'Switch to Robinhood Chain' : 'Launch'}
            </button>
            <p className="text-center text-[12px] text-white/40">0.0005 ETH launch fee + gas</p>
            {status && (
              <p className="rounded-xl border border-[#7EB8DC]/25 bg-[#7EB8DC]/10 px-3 py-2 text-[12px] text-[#A8D4EC]">
                {status}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-white/45 uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-[14px] text-white outline-none placeholder:text-white/30 focus:border-[#7EB8DC]/50'
