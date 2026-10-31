import { useState, useEffect } from 'react';

const PUBG_PACKS = [
  { amount: '12,000', label: 'UC', sub: '15,000 UC Total', price: 490, bonus: '+3000' },
  { amount: '24,000', label: 'UC', sub: '32,000 UC Total', price: 980, bonus: '+8000' },
  { amount: '30,000', label: 'UC', sub: '40,000 UC Total', price: 1220, bonus: '+10000' },
  { amount: '40,500', label: 'UC', sub: '55,500 UC Total', price: 1649, bonus: '+15000', best: true },
  { amount: '50,000', label: 'UC', sub: '68,000 UC Total', price: 2030, bonus: '+18000' },
  { amount: '60,000', label: 'UC', sub: '82,000 UC Total', price: 2440, bonus: '+22000' },
  { amount: '70,000', label: 'UC', sub: '100,000 UC Total', price: 2849, bonus: '+30000', best: true },
];

const FF_PACKS = [
  { amount: '25,000', label: 'DIAMONDS' },
  { amount: '50,000', label: 'DIAMONDS' },
  { amount: '75,000', label: 'DIAMONDS' },
  { amount: '100,000', label: 'DIAMONDS' },
  { amount: '125,000', label: 'DIAMONDS' },
  { amount: '150,000', label: 'DIAMONDS' },
  { amount: '175,000', label: 'DIAMONDS' },
  { amount: '200,000', label: 'DIAMONDS' },
];

const RECENT = [
  { amt: '25,000 DIAMONDS', time: '3 days ago' },
  { amt: '25,000 DIAMONDS', time: '3 days ago' },
  { amt: '25,000 DIAMONDS', time: '3 days ago' },
  { amt: '25,000 DIAMONDS', time: '3 days ago' },
  { amt: '25,000 DIAMONDS', time: '3 days ago' },
];

export default function App() {
  const [game, setGame] = useState<'pubg'|'ff'>('ff');
  const [uid, setUid] = useState('3144989462');
  const [pName, setPName] = useState('لوفر جانان');
  const [sel, setSel] = useState<any>(null);
  const [payMethod, setPayMethod] = useState<'card'|'apple'>('card');
  const [connected, setConnected] = useState(true);

  const PACKS = game === 'pubg' ? PUBG_PACKS : FF_PACKS;

  useEffect(() => {
    const s = localStorage.getItem('uid');
    if (s) setUid(s);
  }, []);

  const buy = (p: any) => {
    if (!uid) { alert('ID dalo!'); return; }
    localStorage.setItem('uid', uid);
    setSel(p);
  };

  return (
    <div style={{ background: '#08080a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* TOP NAV - Screenshot jaisa */}
      <div style={{ background: '#000', borderBottom: '2px solid #1a1a1a', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '14px' }}>
          <span style={{ fontStyle: 'italic' }}>🔥 FREE FIRE</span> <span style={{ color: '#555' }}>|</span> SHOP
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 700 }}>
          <span style={{ color: '#ff1a1a', borderBottom: '2px solid #ff1a1a', paddingBottom: '2px' }}>{game === 'ff' ? 'FREE FIRE DIAMONDS' : 'PUBG UC'}</span>
          <span onClick={() => setGame('pubg')} style={{ cursor: 'pointer', color: game === 'pubg' ? '#fbbf24' : '#888' }}>PUBG UC</span>
          <span onClick={() => setGame('ff')} style={{ cursor: 'pointer', color: game === 'ff' ? '#ff1a1a' : '#888' }}>FREE FIRE</span>
        </div>
        <div style={{ background: '#ff1a1a', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛒</div>
      </div>

      {/* HERO - Screenshot jaisa */}
      <div style={{ background: 'linear-gradient(180deg,#1a0a0a 0%, #000 100%)', padding: '16px 12px', position: 'relative', borderBottom: '2px solid #ff1a1a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, lineHeight: '0.9', fontStyle: 'italic', textTransform: 'uppercase' }}>
              <span style={{ color: 'white' }}>{game === 'ff' ? 'FREE FIRE' : 'PUBG MOBILE'}</span><br/>
              <span style={{ color: game === 'ff' ? '#00d4ff' : '#fbbf24' }}>{game === 'ff' ? 'DIAMONDS 💎' : 'UC SHOP 💰'}</span>
            </h1>
            <p style={{ fontSize: '11px', color: '#ffaa00', marginTop: '6px', fontWeight: 700 }}>FAST & SECURE {game === 'ff' ? 'FREE FIRE DIAMONDS' : 'PUBG UC'} TOP-UP 🔥</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              {['00','00','00','00'].map((v, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ background: '#ff1a1a', padding: '6px 14px', borderRadius: '6px', fontWeight: 900, fontSize: '16px' }}>{v}</div>
                  <div style={{ fontSize: '9px', marginTop: '3px', color: '#aaa' }}>{['Days','Hours','Minutes','Seconds'][i]}</div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '12px', background: '#ff1a1a', border: 'none', padding: '8px 18px', borderRadius: '6px', color: 'white', fontWeight: 900, fontSize: '12px' }}>🛒 Buy Now</button>
          </div>
          <div style={{ width: '140px' }}>
            <div style={{ background: 'linear-gradient(135deg,#0a1a3a,#1a3a8a)', border: '2px solid #00d4ff', borderRadius: '12px', padding: '8px', boxShadow: '0 0 20px #00d4ff66', textAlign: 'center' }}>
              <div style={{ fontSize: '40px' }}>{game === 'ff' ? '💎' : '💰'}</div>
              <div style={{ fontSize: '10px', background: '#000', padding: '4px', borderRadius: '4px', marginTop: '4px', fontWeight: 900 }}>{game === 'ff' ? 'FREE FIRE' : 'PUBG UC'}</div>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 900, textAlign: 'center', marginTop: '6px' }}>{game === 'ff' ? 'FREE FIRE DIAMONDS' : 'PUBG UC STORE'}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px' }}>
        {/* RECENTLY SOLD */}
        <div style={{ marginTop: '6px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '14px', borderLeft: '3px solid #ff1a1a', paddingLeft: '8px' }}>RECENTLY SOLD</h3>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '8px', paddingBottom: '6px' }}>
            {RECENT.map((r, i) => (
              <div key={i} style={{ minWidth: '110px', background: 'linear-gradient(180deg,#5a0a0a,#1a0000)', border: '1px solid #ff1a1a', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px' }}>💎</div>
                <div style={{ fontSize: '10px', fontWeight: 900, marginTop: '4px' }}>{game === 'ff' ? r.amt : '40,500 UC'}</div>
                <div style={{ fontSize: '9px', color: '#ff8888' }}>{r.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH PLAYER */}
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '14px', borderLeft: '3px solid #ff1a1a', paddingLeft: '8px' }}>SEARCH PLAYER</h3>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <div style={{ flex: 1, background: 'white', color: 'black', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', fontWeight: 700, display: 'flex', gap: '8px' }}>
              <span>ID: <input value={uid} onChange={e => setUid(e.target.value)} style={{ border: 'none', outline: 'none', width: '90px', fontWeight: 900 }} /></span>
              <span>Name: <input value={pName} onChange={e => setPName(e.target.value)} style={{ border: 'none', outline: 'none', width: '90px', fontWeight: 700 }} /></span>
            </div>
            <button onClick={() => setConnected(!connected)} style={{ background: connected ? '#ff1a1a' : '#333', border: 'none', borderRadius: '6px', padding: '0 14px', color: 'white', fontWeight: 900, fontSize: '11px' }}>
              {connected ? '🔗 CONNECTED' : 'CONNECT'}
            </button>
          </div>
        </div>

        {/* PACKS - Screenshot jaisa grid */}
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '14px', borderLeft: '3px solid #ff1a1a', paddingLeft: '8px' }}>
            💎 {game === 'ff' ? 'FREE FIRE DIAMONDS PACKS' : 'PUBG UC PACKS (12K-70K)'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            {PACKS.map((p: any, i) => {
              const isSelected = sel?.amount === p.amount;
              return (
                <div key={i} style={{ 
                  background: '#0f0f0f', 
                  border: isSelected ? '2px solid #00ff00' : '1px solid #ff1a1a', 
                  borderRadius: '10px', 
                  padding: '12px', 
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: isSelected ? '0 0 15px #00ff0055' : 'none'
                }}>
                  {isSelected && <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#00ff00', color: 'black', width: '18px', height: '18px', borderRadius: '50%', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
                  <div style={{ fontSize: '36px' }}>{game === 'ff' ? '💎' : '💰'}</div>
                  <div style={{ fontWeight: 900, fontSize: '16px', marginTop: '4px' }}>{p.amount}</div>
                  <div style={{ fontWeight: 900, fontSize: '12px' }}>{p.label}</div>
                  {p.sub && <div style={{ fontSize: '10px', color: '#fbbf24', marginTop: '2px' }}>{p.sub}</div>}
                  {game === 'pubg' && <div style={{ fontSize: '11px', color: '#34d399' }}>{p.bonus} Bonus • AED {p.price}</div>}
                  <button onClick={() => buy(p)} style={{ marginTop: '8px', background: '#ff1a1a', border: 'none', borderRadius: '6px', padding: '6px 0', width: '100%', color: 'white', fontWeight: 900, fontSize: '11px' }}>
                    🛒 Buy Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHECKOUT - Card + Apple Pay */}
      {sel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
          <div style={{ background: '#111', border: '2px solid #ff1a1a', borderRadius: '14px', padding: '20px', width: '100%', maxWidth: '360px' }}>
            <h3 style={{ fontWeight: 900 }}>Checkout - {sel.amount} {sel.label}</h3>
            <div style={{ marginTop: '10px', background: '#000', padding: '10px', borderRadius: '8px', fontSize: '12px' }}>
              <div>ID: <b>{uid}</b> Name: <b>{pName}</b></div>
              <div>Pack: <b style={{ color: '#fbbf24' }}>{sel.amount} {sel.label}</b></div>
              {game === 'pubg' && <div>Price: <b style={{ color: '#34d399' }}>AED {sel.price}</b></div>}
            </div>
            <div style={{ marginTop: '12px', display: 'grid', gap: '6px' }}>
              <label style={{ display: 'flex', gap: '8px', background: payMethod === 'card' ? '#1a0000' : '#000', border: '1px solid #ff1a1a', borderRadius: '8px', padding: '10px', fontSize: '12px' }}>
                <input type="radio" checked={payMethod === 'card'} onChange={() => setPayMethod('card')} /> 💳 Card (Visa/Mastercard)
              </label>
              <label style={{ display: 'flex', gap: '8px', background: payMethod === 'apple' ? '#1a0000' : '#000', border: '1px solid #ff1a1a', borderRadius: '8px', padding: '10px', fontSize: '12px' }}>
                <input type="radio" checked={payMethod === 'apple'} onChange={() => setPayMethod('apple')} /> 🍎 Apple Pay
              </label>
            </div>
            {payMethod === 'card' ? (
              <div style={{ marginTop: '10px', display: 'grid', gap: '6px' }}>
                <input placeholder="Card Number" style={{ background: '#000', border: '1px solid #333', borderRadius: '6px', padding: '10px', color: 'white', fontSize: '12px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <input placeholder="MM/YY" style={{ background: '#000', border: '1px solid #333', borderRadius: '6px', padding: '10px', color: 'white', fontSize: '12px' }} />
                  <input placeholder="CVV" style={{ background: '#000', border: '1px solid #333', borderRadius: '6px', padding: '10px', color: 'white', fontSize: '12px' }} />
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '10px', background: 'black', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px' }}> Pay</div>
                <div style={{ fontSize: '11px', color: '#888' }}>Face ID / Touch ID</div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <button onClick={() => setSel(null)} style={{ flex: 1, background: '#333', border: 'none', borderRadius: '8px', padding: '12px', color: 'white', fontWeight: 700 }}>Cancel</button>
              <button onClick={() => { alert(`✅ Order Success! ${sel.amount} - ${payMethod}`); setSel(null); }} style={{ flex: 1, background: '#ff1a1a', border: 'none', borderRadius: '8px', padding: '12px', color: 'white', fontWeight: 900 }}>{payMethod === 'card' ? 'Pay Now' : ' Pay'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
