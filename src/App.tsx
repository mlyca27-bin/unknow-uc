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
  visa: '4242',
  master: '8888',
  amex: '1001',
  vip: '1234',
  wapp: '+9715537374',
  tele: '@BINRAO876',
  txnType: 'failed',
  txnFailReason: 'Transaction declined.',
  txnSuccessTitle: 'PAYMENT SUCCESS!',
  txnSuccessMsg: 'Your UC will be delivered in 5-30 minutes.',
  txnPendingMsg: 'Payment is being verified.',
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
  contact: 'For support and information, contact our team on WhatsApp or Telegram.',
  privacy: 'We respect your privacy. Please do not share passwords or sensitive account information.',
  terms: 'Please verify your Player UID before making a purchase. Service availability may vary.',
  refund: 'Please contact support for assistance with incorrect or incomplete orders.',
  support: 'Our support team is here to help you.',
  team: 'BIN RAO - Store Developer',
  developer: 'BIN RAO',
  copyright: '© 2026 DEAL STORE. All Rights Reserved.',
  notice: 'Unofficial demo storefront. No payment is processed on this website.'
}

type Settings = typeof defaultSettings
type Content = typeof defaultContent

export default function App() {
  const [game, setGame] = useState<'pubg' | 'ff'>('pubg')
  const [uid, setUid] = useState('3144989462')
  const [sel, setSel] = useState(0)
  const [showSet, setShowSet] = useState(false)
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

  const updateSetting = (key: keyof Settings, value: string) => {
    setSettings(old => ({ ...old, [key]: value }))
  }

  const updateContent = (key: keyof Content, value: string) => {
    setContent(old => ({ ...old, [key]: value }))
  }

  const buyNow = () => {
    const number = settings.wapp.replace(/\D/g, '')
    if (!number) {
      alert('Please add a valid WhatsApp number in Settings.')
      return
    }

    const message = `Hello ${content.storeName}, I am interested in ${gameName}. Package: ${packs[sel].toLocaleString()} ${currency}. Player UID: ${uid}. Please provide purchase information.`
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
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
    { key: 'ffBanner', label: '7. Free Fire Banner' },
    { key: 'visa', label: '8. Visa Display Text' },
    { key: 'master', label: '9. Mastercard Display Text' },
    { key: 'amex', label: '10. Amex Display Text' },
    { key: 'vip', label: '11. VIP Display Text' },
    { key: 'wapp', label: '12. WhatsApp Number' },
    { key: 'tele', label: '13. Telegram Username' },
    { key: 'txnFailReason', label: '14. Transaction Failure Text' },
    { key: 'txnSuccessTitle', label: '15. Success Title' },
    { key: 'txnSuccessMsg', label: '16. Success Message' },
    { key: 'txnPendingMsg', label: '17. Pending Message' },
    { key: 'minPack', label: '18. Minimum Pack Text' },
    { key: 'maxPack', label: '19. Maximum Pack Text' },
    { key: 'vipFee', label: '20. VIP Fee Text' },
    { key: 'normalFee', label: '21. Normal Fee Text' },
    { key: 'refundPolicy', label: '22. Refund Policy' },
    { key: 'lowLevelMsg', label: '23. Support Message' }
  ]

  const contentFields: { key: keyof Content; label: string }[] = [
    { key: 'storeName', label: 'Website / Store Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'about', label: 'About Us' },
    { key: 'contact', label: 'Contact Us' },
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms & Conditions' },
    { key: 'refund', label: 'Refund Policy' },
    { key: 'support', label: 'Customer Support' },
    { key: 'team', label: 'Team Members' },
    { key: 'developer', label: 'Developer Name' },
    { key: 'copyright', label: 'Copyright Text' },
    { key: 'notice', label: 'Website Notice' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.deeper,
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      paddingBottom: 20,
      transition: 'background .25s'
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
          <div style={{ fontWeight: 1000, fontSize: 21, letterSpacing: 1 }}>
            {content.storeName}
          </div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>
            {content.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button onClick={() => { setGame('pubg'); setSel(0) }}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${isPubg ? '#60a5fa' : '#334155'}`,
              background: isPubg ? '#2563eb' : '#172033',
              color: '#fff',
              fontWeight: 900,
              cursor: 'pointer'
            }}>
            PUBG UC
          </button>
          <button onClick={() => { setGame('ff'); setSel(0) }}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${!isPubg ? '#f87171' : '#334155'}`,
              background: !isPubg ? '#dc2626' : '#172033',
              color: '#fff',
              fontWeight: 900,
              cursor: 'pointer'
            }}>
            FREE FIRE
          </button>
          <button onClick={() => setShowSet(true)}
            style={{
              padding: '10px 13px',
              borderRadius: 8,
              border: '1px solid #fbbf24',
              background: '#172033',
              color: '#fbbf24',
              fontWeight: 900,
              cursor: 'pointer'
            }}>
            ⚙ SETTINGS
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: 'auto', padding: 15 }}>
        <section style={{
          padding: '25px 18px',
          borderRadius: 16,
          marginTop: 12,
          background: `linear-gradient(120deg, ${theme.dark}, ${theme.main})`,
          border: `1px solid ${theme.border}`,
          boxShadow: `0 8px 30px ${theme.glow}`
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 900 }}>
            OFFICIAL STORE STYLE
          </div>
          <h1 style={{ fontSize: 27, margin: '9px 0' }}>{banner}</h1>
          <p style={{ margin: 0, color: '#e2e8f0', fontSize: 13 }}>
            Fast Support • Easy UID Entry • {gameName}
          </p>
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
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 10 }}>
            {[settings.uid1, settings.uid2, settings.uid3].filter(Boolean).map((v, i) => (
              <button key={i} onClick={() => setUid(v)}
                style={{
                  padding: '7px 11px',
                  background: '#172033',
                  color: '#cbd5e1',
                  border: '1px solid #475569',
                  borderRadius: 20,
                  cursor: 'pointer'
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
          <h2 style={{ fontSize: 18, margin: '3px 0 14px' }}>
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
                <div style={{ fontSize: 32, marginBottom: 7 }}>
                  {isPubg ? '🪙' : '💎'}
                </div>
                <div style={{ fontSize: 17, fontWeight: 900 }}>
                  {amount.toLocaleString()}
                </div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 3 }}>
                  {currency}
                </div>
                <button onClick={e => {
                  e.stopPropagation()
                  setSel(i)
                  buyNow()
                }}
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 12,
                    border: 0,
                    borderRadius: 7,
                    background: theme.main,
                    color: '#fff',
                    fontWeight: 900,
                    cursor: 'pointer'
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
          <h3 style={{ margin: '0 0 8px' }}>WHY CHOOSE {content.storeName}?</h3>
          <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>
            Easy UID entry • Dedicated support • PUBG UC • Free Fire Diamonds
          </p>
          <p style={{ color: '#fbbf24', fontSize: 11 }}>{settings.refundPolicy}</p>
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
                <p style={{ fontSize: 12, lineHeight: 1.6 }}>{content[key]}</p>
              </details>
            ))}
          </div>

          <div>
            <h3>CONTACT & SUPPORT</h3>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>{content.contact}</p>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>
              WhatsApp: {settings.wapp}
            </p>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>
              Telegram: {settings.tele}
            </p>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>{content.support}</p>
          </div>

          <div>
            <h3>OUR TEAM</h3>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>{content.team}</p>
            <p style={{ fontSize: 13, color: '#cbd5e1' }}>
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
          <p style={{ color: theme.main, fontSize: 13, fontWeight: 900 }}>
            Developed by {content.developer} ❤️
          </p>
        </div>
      </footer>

      {showSet && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          overflowY: 'auto',
          background: 'rgba(0,0,0,.94)',
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
              alignItems: 'center',
              gap: 10
            }}>
              <h2 style={{ fontSize: 19 }}>⚙ WEBSITE SETTINGS</h2>
              <button onClick={() => setShowSet(false)}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 0,
                  borderRadius: 7,
                  padding: '9px 13px',
                  fontWeight: 900
                }}>
                CLOSE
              </button>
            </div>

            <h3 style={{ color: '#fbbf24', marginTop: 20 }}>
              GAME & STORE SETTINGS
            </h3>
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
              Yahan se About, Contact, Policy, Team aur Developer ki details edit kar sakte hain.
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
