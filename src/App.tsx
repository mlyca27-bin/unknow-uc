
import { useEffect, useState } from 'react'

const packs = [25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000]

const defaultSettings = {
  pubgName: 'BINRAO 876',
  ffName: 'BINRAO FF',
  uid1: '5991827364',
  uid2: '5829104821',
  uid3: '5123456789',
  pubgBanner: 'DEAL STORE - PUBG UC STORE',
  ffBanner: 'DEAL STORE - FREE FIRE DIAMONDS STORE',
  visa: 'VISA PLATINUM',
  master: 'MASTERCARD WORLD',
  amex: 'AMERICAN EXPRESS',
  vip: 'GOLDEN VIP CARD',
  wapp: '+9715537374',
  tele: '@BINRAO876',
  txnType: 'failed',
  txnFailReason: 'Transaction declined.',
  txnSuccessTitle: 'PAYMENT SUCCESS!',
  txnSuccessMsg: 'Your order has been confirmed.',
  txnPendingMsg: 'Your order is being verified.',
  minPack: '25000',
  maxPack: '200000',
  vipFee: '0% FEE',
  normalFee: '3% FEE',
  refundPolicy: 'Please check your UID before ordering.',
  lowLevelMsg: 'Please contact support.'
}

const defaultContent = {
  storeName: 'DEAL STORE',
  tagline: 'YOUR GAMING STORE',
  about: 'Welcome to Deal Store. Your gaming store for PUBG UC and Free Fire Diamonds.',
  contact: 'Contact our team for support and information.',
  privacy: 'We respect your privacy. Never share passwords.',
  terms: 'Please verify your Player UID before ordering.',
  refund: 'Please contact support for incorrect orders.',
  support: 'Our support team is here to help you.',
  team: 'BIN RAO - Store Developer',
  developer: 'BIN RAO',
  copyright: '© 2026 DEAL STORE. All Rights Reserved.',
  notice: 'Demo simulation. No real payment is processed.'
}

type Settings = typeof defaultSettings
type Content = typeof defaultContent
type Method = 'visa' | 'master' | 'amex' | 'vip'

export default function App() {
  const [game, setGame] = useState<'pubg' | 'ff'>('pubg')
  const [uid, setUid] = useState('3144989462')
  const [sel, setSel] = useState(0)
  const [showSet, setShowSet] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [showTxn, setShowTxn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [payMethod, setPayMethod] = useState<Method>('vip')
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('deal-store-settings')
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })
  const [content, setContent] = useState<Content>(() => {
    try {
      const saved = localStorage.getItem('deal-store-content')
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
    } catch {
      return defaultContent
    }
  })

  useEffect(() => {
    localStorage.setItem('deal-store-settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem('deal-store-content', JSON.stringify(content))
  }, [content])

  const isPubg = game === 'pubg'

  const theme = isPubg
    ? {
        main: '#2563eb',
        dark: '#07152f',
        deeper: '#030b1c',
        border: '#3b82f6',
        glow: 'rgba(37,99,235,.25)'
      }
    : {
        main: '#dc2626',
        dark: '#300909',
        deeper: '#160303',
        border: '#ef4444',
        glow: 'rgba(220,38,38,.25)'
      }

  const gameName = isPubg ? 'PUBG UC' : 'FREE FIRE'
  const currency = isPubg ? 'UC' : 'DIAMONDS'
  const playerName = isPubg ? settings.pubgName : settings.ffName
  const banner = isPubg ? settings.pubgBanner : settings.ffBanner
  const selectedPack = packs[sel]

  const updateSetting = (key: keyof Settings, value: string) => {
    setSettings(old => ({ ...old, [key]: value }))
  }

  const updateContent = (key: keyof Content, value: string) => {
    setContent(old => ({ ...old, [key]: value }))
  }

  const openPayment = (index: number) => {
    setSel(index)
    setPayMethod('vip')
    setShowPay(true)
  }

  const startPaymentSimulation = () => {
    if (loading) return

    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      setShowPay(false)
      setShowTxn(true)
    }, 3000)
  }

  const closePayment = () => {
    if (!loading) setShowPay(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: 11,
    borderRadius: 8,
    background: '#080f20',
    color: 'white',
    border: '1px solid #334155',
    outline: 'none',
    fontSize: 13
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 5,
    fontWeight: 700
  }

  const settingFields: { key: keyof Settings; label: string }[] = [
    { key: 'pubgName', label: '1. PUBG Player Name' },
    { key: 'ffName', label: '2. Free Fire Player Name' },
    { key: 'uid1', label: '3. Saved UID 1' },
    { key: 'uid2', label: '4. Saved UID 2' },
    { key: 'uid3', label: '5. Saved UID 3' },
    { key: 'pubgBanner', label: '6. PUBG Banner' },
    { key: 'ffBanner', label: '7. FF Banner' },
    { key: 'visa', label: '8. Visa Display' },
    { key: 'master', label: '9. Mastercard Display' },
    { key: 'amex', label: '10. Amex Display' },
    { key: 'vip', label: '11. VIP Display' },
    { key: 'wapp', label: '12. WhatsApp Number' },
    { key: 'tele', label: '13. Telegram Username' },
    { key: 'txnFailReason', label: '14. Failure Reason' },
    { key: 'txnSuccessTitle', label: '15. Success Title' },
    { key: 'txnSuccessMsg', label: '16. Success Message' },
    { key: 'txnPendingMsg', label: '17. Pending Message' },
    { key: 'minPack', label: '18. Minimum Pack' },
    { key: 'maxPack', label: '19. Maximum Pack' },
    { key: 'vipFee', label: '20. VIP Fee' },
    { key: 'normalFee', label: '21. Normal Fee' },
    { key: 'refundPolicy', label: '22. Refund Policy' },
    { key: 'lowLevelMsg', label: '23. Support Message' }
  ]

  const contentFields: { key: keyof Content; label: string }[] = [
    { key: 'storeName', label: 'Store Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'about', label: 'About Us' },
    { key: 'contact', label: 'Contact Us' },
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms & Conditions' },
    { key: 'refund', label: 'Refund Policy' },
    { key: 'support', label: 'Customer Support' },
    { key: 'team', label: 'Team Members' },
    { key: 'developer', label: 'Developer Name' },
    { key: 'copyright', label: 'Copyright' },
    { key: 'notice', label: 'Website Notice' }
  ]

  const methods: {
    id: Method
    name: string
    display: string
    fee: string
  }[] = [
    { id: 'visa', name: 'Visa Platinum', display: settings.visa, fee: settings.normalFee },
    { id: 'master', name: 'Mastercard World', display: settings.master, fee: settings.normalFee },
    { id: 'amex', name: 'American Express', display: settings.amex, fee: settings.normalFee },
    { id: 'vip', name: 'Golden VIP Card', display: settings.vip, fee: settings.vipFee }
  ]

  const isVip = payMethod === 'vip'

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.deeper,
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      paddingBottom: 20
    }}>

      <header style={{
        background: theme.dark,
        borderBottom: `2px solid ${theme.main}`,
        padding: '14px 4%',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{ fontWeight: 1000, fontSize: 21 }}>
            {content.storeName}
          </div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>
            {content.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button onClick={() => { setGame('pubg'); setSel(0) }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid #60a5fa',
              background: isPubg ? '#2563eb' : '#172033',
              color: '#fff',
              fontWeight: 900
            }}>
            PUBG UC
          </button>

          <button onClick={() => { setGame('ff'); setSel(0) }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid #f87171',
              background: !isPubg ? '#dc2626' : '#172033',
              color: '#fff',
              fontWeight: 900
            }}>
            FREE FIRE
          </button>

          <button onClick={() => setShowSet(true)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid #fbbf24',
              background: '#172033',
              color: '#fbbf24',
              fontWeight: 900
            }}>
            ⚙ SETTINGS
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: 'auto', padding: 15 }}>

        <section style={{
          padding: 25,
          borderRadius: 16,
          marginTop: 12,
          background: `linear-gradient(120deg, ${theme.dark}, ${theme.main})`,
          border: `1px solid ${theme.border}`,
          boxShadow: `0 8px 30px ${theme.glow}`
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 900 }}>
            GAMING STORE
          </div>
          <h1 style={{ fontSize: 27 }}>{banner}</h1>
          <p style={{ fontSize: 13 }}>Fast Support • Easy UID Entry • {gameName}</p>
        </section>

        <section style={{
          marginTop: 16,
          background: theme.dark,
          border: `1px solid ${theme.border}`,
          padding: 15,
          borderRadius: 13
        }}>
          <label style={labelStyle}>PLAYER ID / UID</label>
          <input
            value={uid}
            onChange={e => setUid(e.target.value)}
            placeholder="Enter your Player UID"
            style={inputStyle}
          />

          <div style={{ display: 'flex', gap: 7, marginTop: 10, flexWrap: 'wrap' }}>
            {[settings.uid1, settings.uid2, settings.uid3].filter(Boolean).map((v, i) => (
              <button key={i} onClick={() => setUid(v)}
                style={{
                  padding: 7,
                  background: '#172033',
                  color: '#cbd5e1',
                  border: '1px solid #475569',
                  borderRadius: 20
                }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8 }}>
            Game: {gameName}
          </div>
        </section>

        <section style={{
          marginTop: 17,
          background: theme.dark,
          border: `1px solid ${theme.border}`,
          borderRadius: 13,
          padding: 14
        }}>
          <h2 style={{ fontSize: 18 }}>
            {isPubg ? '🪙 PUBG UC PACKAGES' : '💎 FREE FIRE DIAMONDS'}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
            gap: 11
          }}>
            {packs.map((amount, i) => (
              <div key={amount} onClick={() => setSel(i)}
                style={{
                  padding: 13,
                  textAlign: 'center',
                  borderRadius: 11,
                  background: '#080f20',
                  border: sel === i ? `2px solid ${theme.main}` : '1px solid #334155',
                  cursor: 'pointer',
                  boxShadow: sel === i ? `0 0 14px ${theme.glow}` : 'none'
                }}>
                <div style={{ fontSize: 32 }}>
                  {isPubg ? '🪙' : '💎'}
                </div>

                <div style={{ fontSize: 17, fontWeight: 900 }}>
                  {amount.toLocaleString()}
                </div>

                <div style={{ color: '#94a3b8', fontSize: 11 }}>
                  {currency}
                </div>

                <button onClick={e => {
                  e.stopPropagation()
                  openPayment(i)
                }}
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 12,
                    border: 0,
                    borderRadius: 7,
                    background: theme.main,
                    color: '#fff',
                    fontWeight: 900
                  }}>
                  BUY NOW
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          marginTop: 17,
          background: theme.dark,
          border: `1px solid ${theme.border}`,
          padding: 16,
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <h3>WHY CHOOSE {content.storeName}?</h3>
          <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>
            Easy UID Entry • Dedicated Support • PUBG UC • Free Fire Diamonds
          </p>
          <p style={{ color: '#fbbf24', fontSize: 11 }}>
            {settings.refundPolicy}
          </p>
        </section>
      </main>

      <footer style={{
        marginTop: 25,
        padding: '30px 5%',
        background: '#080d18',
        borderTop: `2px solid ${theme.main}`
      }}>
        <div style={{
          maxWidth: 1100,
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 24
        }}>
          <div>
            <h2 style={{ color: theme.main }}>{content.storeName}</h2>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
              {content.about}
            </p>
          </div>

          <div>
            <h3>INFORMATION</h3>
            {(['about', 'terms', 'privacy', 'refund'] as const).map(key => (
              <details key={key} style={{ marginBottom: 8, color: '#cbd5e1' }}>
                <summary style={{ cursor: 'pointer' }}>
                  {key === 'about' ? 'About Us' :
                    key === 'terms' ? 'Terms & Conditions' :
                      key === 'privacy' ? 'Privacy Policy' : 'Refund Policy'}
                </summary>
                <p style={{ fontSize: 12, lineHeight: 1.6 }}>
                  {content[key]}
                </p>
              </details>
            ))}
          </div>

          <div>
            <h3>CONTACT & SUPPORT</h3>
            <p style={{ fontSize: 13 }}>{content.contact}</p>
            <p style={{ fontSize: 13 }}>WhatsApp: {settings.wapp}</p>
            <p style={{ fontSize: 13 }}>Telegram: {settings.tele}</p>
            <p style={{ fontSize: 13 }}>{content.support}</p>
          </div>

          <div>
            <h3>OUR TEAM</h3>
            <p style={{ fontSize: 13 }}>{content.team}</p>
            <p style={{ fontSize: 13 }}>
              Developer: {content.developer}
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: 1100,
          margin: '25px auto 0',
          borderTop: '1px solid #263244',
          paddingTop: 17,
          textAlign: 'center'
        }}>
          <p style={{ color: '#94a3b8', fontSize: 11 }}>{content.notice}</p>
          <p style={{ color: '#cbd5e1', fontSize: 12 }}>{content.copyright}</p>
          <p style={{ color: theme.main, fontWeight: 900 }}>
            Developed by {content.developer} ❤️
          </p>
        </div>
      </footer>

      {/* PAYMENT POPUP */}

      {showPay && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          overflowY: 'auto',
          background: 'rgba(0,0,0,.94)',
          padding: 12
        }}>
          <div style={{
            maxWidth: 480,
            margin: '20px auto',
            padding: 16,
            borderRadius: 16,
            background: '#0b1224',
            border: `1px solid ${isVip ? '#fbbf24' : theme.border}`,
            boxShadow: isVip ? '0 0 25px #fbbf2433' : 'none'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: 19 }}>PAYMENT DETAILS</h2>
              <button onClick={closePayment} disabled={loading}
                style={{
                  padding: 9,
                  background: '#dc2626',
                  color: '#fff',
                  border: 0,
                  borderRadius: 7
                }}>
                ✕
              </button>
            </div>

            <div style={{
              background: '#111c32',
              borderRadius: 12,
              padding: 14,
              marginTop: 10,
              border: '1px solid #334155'
            }}>
              <div style={{ color: '#fbbf24', fontSize: 11, fontWeight: 900 }}>
                SELECTED PACKAGE
              </div>
              <h2 style={{ margin: '8px 0' }}>
                {selectedPack.toLocaleString()} {currency}
              </h2>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>
                Game: {gameName}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>
                UID: {uid || 'Not entered'}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>
                Username: {playerName}
              </div>
            </div>

            <h3 style={{ fontSize: 13, color: '#fbbf24', marginTop: 20 }}>
              SELECT PAYMENT METHOD
            </h3>

            {methods.map(method => (
              <div key={method.id}
                onClick={() => !loading && setPayMethod(method.id)}
                style={{
                  padding: 13,
                  marginBottom: 9,
                  borderRadius: 11,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: payMethod === method.id ? '#1e293b' : '#101a30',
                  border: payMethod === method.id
                    ? `2px solid ${method.id === 'vip' ? '#fbbf24' : theme.main}`
                    : '1px solid #334155',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}>
                <div>
                  <div style={{
                    fontWeight: 900,
                    fontSize: 13,
                    color: method.id === 'vip' ? '#ffd700' : '#fff'
                  }}>
                    {method.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 5 }}>
                    {method.display} • {method.fee}
                  </div>
                  {method.id === 'vip' && (
                    <div style={{ color: '#fbbf24', fontSize: 10 }}>
                      ★ VIP GOLDEN
                    </div>
                  )}
                </div>
                <div style={{
                  width: 19,
                  height: 19,
                  borderRadius: '50%',
                  border: '2px solid #fbbf24',
                  background: payMethod === method.id ? '#fbbf24' : 'transparent'
                }} />
              </div>
            ))}

            <div style={{
              padding: 12,
              background: '#172033',
              border: '1px dashed #64748b',
              borderRadius: 10,
              marginTop: 15,
              fontSize: 12,
              color: '#cbd5e1'
            }}>
              <b>Demo Payment Simulation</b>
              <p>
                This is a visual payment simulation. No card credentials,
                CVC or real payment information are requested or processed.
              </p>
            </div>

            <button onClick={startPaymentSimulation}
              disabled={loading}
              style={{
                width: '100%',
                padding: 15,
                marginTop: 15,
                background: loading ? '#64748b' : isVip
                  ? 'linear-gradient(90deg,#fbbf24,#ffd700)'
                  : theme.main,
                color: isVip ? '#000' : '#fff',
                border: 0,
                borderRadius: 10,
                fontWeight: 900,
                fontSize: 14
              }}>
              {loading ? 'PROCESSING...' : 'CONTINUE DEMO →'}
            </button>
          </div>
        </div>
      )}

      {/* LOADING AND TRANSACTION RESULT */}

      {showTxn && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12
        }}>
          <div style={{
            width: '100%',
            maxWidth: 390,
            padding: 22,
            borderRadius: 18,
            background: isVip ? '#191504' : '#0a1040',
            border: `2px solid ${isVip ? '#fbbf24' : theme.border}`,
            textAlign: 'center',
            boxShadow: isVip ? '0 0 25px #fbbf2433' : 'none'
          }}>
            <div style={{
              color: isVip ? '#ffd700' : theme.main,
              fontWeight: 900,
              fontSize: 12
            }}>
              TRANSACTION RESULT {isVip ? '★ VIP' : ''}
            </div>

            {settings.txnType === 'failed' ? (
              <>
                <div style={{
                  fontSize: 45,
                  color: '#ef4444',
                  marginTop: 15
                }}>✕</div>
                <h2 style={{ color: '#ff6b6b' }}>PAYMENT FAILED!</h2>
                <p style={{ fontSize: 12, color: '#cbd5e1' }}>
                  {settings.txnFailReason}
                </p>
              </>
            ) : settings.txnType === 'pending' ? (
              <>
                <div style={{ fontSize: 45, color: '#fbbf24', marginTop: 15 }}>
                  ◷
                </div>
                <h2 style={{ color: '#fbbf24' }}>PAYMENT PENDING!</h2>
                <p style={{ fontSize: 12, color: '#cbd5e1' }}>
                  {settings.txnPendingMsg}
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: 45, color: '#22c55e', marginTop: 15 }}>
                  ✓
                </div>
                <h2 style={{ color: '#22c55e' }}>
                  {settings.txnSuccessTitle}
                </h2>
                <p style={{ fontSize: 12, color: '#cbd5e1' }}>
                  {settings.txnSuccessMsg}
                </p>
              </>
            )}

            <div style={{
              textAlign: 'left',
              background: '#020617',
              border: '1px solid #334155',
              borderRadius: 10,
              padding: 13,
              marginTop: 15,
              fontSize: 12
            }}>
              <p>Package: <b>{selectedPack.toLocaleString()} {currency}</b></p>
              <p>Game: <b>{gameName}</b></p>
              <p>UID: <b>{uid}</b></p>
              <p>Username: <b>{playerName}</b></p>
              <p>Method: <b>{payMethod.toUpperCase()}</b></p>
              <p style={{ color: '#94a3b8' }}>
                Status: DEMO SIMULATION — NOT A REAL PAYMENT
              </p>
            </div>

            <div style={{ display: 'flex', gap: 9, marginTop: 17 }}>
              <button onClick={() => setShowTxn(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: '#334155',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  fontWeight: 900
                }}>
                CLOSE
              </button>

              <button onClick={() => {
                setShowTxn(false)
                setShowPay(true)
              }}
                style={{
                  flex: 1,
                  padding: 12,
                  background: theme.main,
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  fontWeight: 900
                }}>
                RETRY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ALL WEBSITE SETTINGS */}

      {showSet && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          overflowY: 'auto',
          background: 'rgba(0,0,0,.96)',
          padding: 12
        }}>
          <div style={{
            maxWidth: 650,
            margin: '10px auto',
            padding: 17,
            background: '#111b2e',
            border: '1px solid #475569',
            borderRadius: 14
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2>⚙ WEBSITE SETTINGS</h2>
              <button onClick={() => setShowSet(false)}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 0,
                  borderRadius: 7,
                  padding: 9
                }}>
                CLOSE
              </button>
            </div>

            <h3 style={{ color: '#fbbf24' }}>GAME & STORE SETTINGS</h3>

            <div style={{ display: 'grid', gap: 11 }}>
              {settingFields.map(field => (
                <label key={field.key}>
                  <span style={labelStyle}>{field.label}</span>
                  <input
                    value={settings[field.key]}
                    onChange={e => updateSetting(field.key, e.target.value)}
                    style={inputStyle}
                  />
                </label>
              ))}
            </div>

            <h3 style={{ color: '#fbbf24', marginTop: 25 }}>
              WEBSITE CONTENT SETTINGS
            </h3>

            <p style={{ fontSize: 12, color: '#94a3b8' }}>
              Edit About, Contact, Policy, Team and Developer details here.
            </p>

            <div style={{ display: 'grid', gap: 11 }}>
              {contentFields.map(field => (
                <label key={field.key}>
                  <span style={labelStyle}>{field.label}</span>
                  <textarea
                    rows={3}
                    value={content[field.key]}
                    onChange={e => updateContent(field.key, e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </label>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: 9,
              marginTop: 20,
              flexWrap: 'wrap'
            }}>
              <button onClick={() => {
                localStorage.setItem('deal-store-settings', JSON.stringify(settings))
                localStorage.setItem('deal-store-content', JSON.stringify(content))
                alert('All settings saved successfully!')
              }}
                style={{
                  flex: 1,
                  padding: 13,
                  background: '#16a34a',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  fontWeight: 900
                }}>
                SAVE ALL SETTINGS
              </button>

              <button onClick={() => {
                if (confirm('Reset all settings to default?')) {
                  setSettings(defaultSettings)
                  setContent(defaultContent)
                }
              }}
                style={{
                  padding: 13,
                  background: '#475569',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  fontWeight: 900
                }}>
                RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
