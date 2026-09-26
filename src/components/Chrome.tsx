import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { LUNCH_CA, truncateAddress } from '../data/product'
import { useWallet } from '../lib/WalletContext'
import { BrandMark } from './BrandMark'
import { CopyAddress } from './CopyAddress'
import { WalletModal } from './WalletModal'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/pulse', label: 'Pulse' },
  { to: '/launch', label: 'Launch' },
  { to: '/distributions', label: 'Distributions' },
  { to: '/docs', label: 'Docs' },
] as const

export function Chrome() {
  const { address, openModal, disconnect, isRobinhood, walletKind } = useWallet()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-white/10 bg-black/85 px-3 py-2 shadow-lg backdrop-blur-xl md:gap-3 md:px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2 pr-1" onClick={() => setOpen(false)}>
            <BrandMark size={32} />
            <span className="hidden text-[15px] font-semibold text-white sm:inline">Seventa</span>
          </Link>

          <nav className="mx-auto hidden items-center gap-1 rounded-full bg-white/5 p-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <CopyAddress address={LUNCH_CA} label="CA" className="hidden sm:inline-flex" />

            {address ? (
              <div className="flex items-center gap-1.5">
                {!isRobinhood && (
                  <span className="hidden rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-semibold text-amber-300 lg:inline">
                    Switch to RHC
                  </span>
                )}
                {walletKind && (
                  <span className="hidden rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold text-white/45 capitalize lg:inline">
                    {walletKind === 'robinhood' ? 'Robinhood' : walletKind}
                  </span>
                )}
                <button
                  type="button"
                  onClick={disconnect}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[12px] text-white/80 hover:border-[#7EB8DC]/40"
                  title="Disconnect"
                >
                  {truncateAddress(address)}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openModal}
                className="rounded-full bg-[#7EB8DC] px-3.5 py-2 text-[12px] font-bold text-[#061018] transition hover:brightness-110 md:px-4 md:text-[13px]"
              >
                Connect wallet
              </button>
            )}

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/95 pt-20 backdrop-blur-md md:hidden">
          <div className="px-5 pb-4">
            <CopyAddress address={LUNCH_CA} label="CA" className="w-full justify-center" />
          </div>
          <nav className="flex flex-col gap-2 px-5">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-[18px] font-semibold ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <WalletModal />
    </>
  )
}
