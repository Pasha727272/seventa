import { useWallet } from '../lib/WalletContext'
import { BrandMark } from './BrandMark'

export function WalletModal() {
  const {
    modalOpen,
    closeModal,
    connecting,
    connectPhantom,
    connectRobinhood,
    error,
    hasPhantom,
    hasInjected,
  } = useWallet()

  if (!modalOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <BrandMark size={40} />
          <div>
            <h2 className="text-[18px] font-bold text-white">Connect wallet</h2>
            <p className="text-[12px] text-white/50">
              One tap · then we switch you to Robinhood Chain
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            disabled={connecting}
            onClick={() => void connectPhantom()}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left transition hover:border-[#7EB8DC]/40 hover:bg-[#7EB8DC]/8 disabled:opacity-60"
          >
            <img
              src="/wallets/phantom.png"
              alt="Phantom"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
              loading="eager"
            />
            <span className="flex-1">
              <span className="block text-[14px] font-semibold text-white">Phantom</span>
              <span className="block text-[12px] text-white/45">
                {hasPhantom ? 'Detected · EVM on Robinhood Chain' : 'Install if missing · opens site'}
              </span>
            </span>
          </button>

          <button
            type="button"
            disabled={connecting}
            onClick={() => void connectRobinhood()}
            className="flex w-full items-center gap-3 rounded-2xl border border-[#7EB8DC]/35 bg-[#7EB8DC]/10 px-4 py-3.5 text-left transition hover:bg-[#7EB8DC]/16 disabled:opacity-60"
          >
            <img
              src="/wallets/robinhood.png"
              alt="Robinhood"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
              loading="eager"
            />
            <span className="flex-1">
              <span className="block text-[14px] font-semibold text-white">Robinhood Wallet</span>
              <span className="block text-[12px] text-white/45">
                {hasInjected
                  ? 'Browser / in-app wallet · Robinhood Chain'
                  : 'Open docs to add network'}
              </span>
            </span>
          </button>
        </div>

        {connecting && (
          <p className="mt-4 text-center text-[12px] text-[#A8D4EC]">Approve in your wallet…</p>
        )}
        {error && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={closeModal}
          className="mt-4 w-full rounded-full border border-white/10 py-2.5 text-[13px] text-white/60 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
