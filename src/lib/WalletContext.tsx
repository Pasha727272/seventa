import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ROBINHOOD_CHAIN } from '../data/product'

export type WalletKind = 'phantom' | 'robinhood' | 'injected'

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
  isPhantom?: boolean
  isMetaMask?: boolean
  providers?: EthereumProvider[]
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
    phantom?: { ethereum?: EthereumProvider; solana?: unknown }
  }
}

type WalletState = {
  address: string | null
  chainId: number | null
  connecting: boolean
  error: string | null
  walletKind: WalletKind | null
  isRobinhood: boolean
  modalOpen: boolean
  openModal: () => void
  closeModal: () => void
  connectPhantom: () => Promise<void>
  connectRobinhood: () => Promise<void>
  connectInjected: () => Promise<void>
  disconnect: () => void
  ensureRobinhood: () => Promise<void>
  hasPhantom: boolean
  hasInjected: boolean
}

const WalletContext = createContext<WalletState | null>(null)

function parseChainId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number.parseInt(value, 16)
  return null
}

function getPhantomProvider(): EthereumProvider | null {
  return window.phantom?.ethereum ?? null
}

function getInjectedProviders(): EthereumProvider[] {
  const eth = window.ethereum
  if (!eth) return []
  if (Array.isArray(eth.providers) && eth.providers.length) return eth.providers
  return [eth]
}

/** Prefer non-Phantom injected provider (MetaMask / Robinhood / Rabby…) */
function getRobinhoodishProvider(): EthereumProvider | null {
  const all = getInjectedProviders()
  const nonPhantom = all.find((p) => !p.isPhantom)
  return nonPhantom ?? all[0] ?? null
}

async function switchToRobinhood(eth: EthereumProvider) {
  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ROBINHOOD_CHAIN.chainIdHex }],
    })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 4902) {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: ROBINHOOD_CHAIN.chainIdHex,
            chainName: ROBINHOOD_CHAIN.chainName,
            nativeCurrency: ROBINHOOD_CHAIN.nativeCurrency,
            rpcUrls: [...ROBINHOOD_CHAIN.rpcUrls],
            blockExplorerUrls: [...ROBINHOOD_CHAIN.blockExplorerUrls],
          },
        ],
      })
      return
    }
    throw err
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletKind, setWalletKind] = useState<WalletKind | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeProvider, setActiveProvider] = useState<EthereumProvider | null>(null)
  const [hasPhantom, setHasPhantom] = useState(false)
  const [hasInjected, setHasInjected] = useState(false)

  useEffect(() => {
    setHasPhantom(Boolean(getPhantomProvider()))
    setHasInjected(getInjectedProviders().length > 0)
  }, [modalOpen])

  const bindProvider = useCallback((provider: EthereumProvider) => {
    setActiveProvider(provider)
  }, [])

  useEffect(() => {
    const eth = activeProvider
    if (!eth?.on) return

    const onAccounts = (accs: unknown) => {
      const list = accs as string[]
      setAddress(list[0] ?? null)
      if (!list[0]) setWalletKind(null)
    }
    const onChain = (id: unknown) => setChainId(parseChainId(id))

    eth.on('accountsChanged', onAccounts)
    eth.on('chainChanged', onChain)
    return () => {
      eth.removeListener?.('accountsChanged', onAccounts)
      eth.removeListener?.('chainChanged', onChain)
    }
  }, [activeProvider])

  const connectWith = useCallback(
    async (provider: EthereumProvider, kind: WalletKind) => {
      setConnecting(true)
      setError(null)
      try {
        const accounts = (await provider.request({
          method: 'eth_requestAccounts',
        })) as string[]
        bindProvider(provider)
        setAddress(accounts[0] ?? null)
        setWalletKind(kind)
        await switchToRobinhood(provider)
        const id = await provider.request({ method: 'eth_chainId' })
        setChainId(parseChainId(id))
        setModalOpen(false)
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Connection rejected'
        setError(msg)
        throw e
      } finally {
        setConnecting(false)
      }
    },
    [bindProvider],
  )

  const connectPhantom = useCallback(async () => {
    const phantom = getPhantomProvider()
    if (!phantom) {
      setError('Phantom not found. Install Phantom, then refresh.')
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer')
      return
    }
    await connectWith(phantom, 'phantom')
  }, [connectWith])

  const connectRobinhood = useCallback(async () => {
    const provider = getRobinhoodishProvider()
    if (!provider) {
      setError(
        'No Robinhood / browser wallet found. Open Robinhood Wallet in-app browser, or install MetaMask and add Robinhood Chain.',
      )
      window.open(
        'https://docs.robinhood.com/chain/add-network-to-wallet/',
        '_blank',
        'noopener,noreferrer',
      )
      return
    }
    await connectWith(provider, 'robinhood')
  }, [connectWith])

  const connectInjected = useCallback(async () => {
    const provider = window.ethereum
    if (!provider) {
      setError('No wallet extension detected.')
      return
    }
    await connectWith(provider, 'injected')
  }, [connectWith])

  const ensureRobinhood = useCallback(async () => {
    const eth = activeProvider ?? getRobinhoodishProvider() ?? getPhantomProvider()
    if (!eth) throw new Error('Connect a wallet first.')
    await switchToRobinhood(eth)
    const id = await eth.request({ method: 'eth_chainId' })
    setChainId(parseChainId(id))
  }, [activeProvider])

  const disconnect = useCallback(() => {
    setAddress(null)
    setWalletKind(null)
    setError(null)
    setActiveProvider(null)
  }, [])

  const value = useMemo<WalletState>(
    () => ({
      address,
      chainId,
      connecting,
      error,
      walletKind,
      isRobinhood: chainId === ROBINHOOD_CHAIN.chainId,
      modalOpen,
      openModal: () => {
        setError(null)
        setModalOpen(true)
      },
      closeModal: () => setModalOpen(false),
      connectPhantom,
      connectRobinhood,
      connectInjected,
      disconnect,
      ensureRobinhood,
      hasPhantom,
      hasInjected,
    }),
    [
      address,
      chainId,
      connecting,
      error,
      walletKind,
      modalOpen,
      connectPhantom,
      connectRobinhood,
      connectInjected,
      disconnect,
      ensureRobinhood,
      hasPhantom,
      hasInjected,
    ],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
