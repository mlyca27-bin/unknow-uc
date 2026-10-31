import { useState, useEffect } from 'react';

const PACKS = [
  { id: 1, t: '12000 UC', total: '15000 UC Total', bonus: '+3000 Bonus', price: 490, best: false },
  { id: 2, t: '24000 UC', total: '32000 UC Total', bonus: '+8000 Bonus', price: 980, best: false },
  { id: 3, t: '30000 UC', total: '40000 UC Total', bonus: '+10000 Bonus', price: 1220, best: false },
  { id: 4, t: '40500 UC', total: '55500 UC Total', bonus: '+15000 Bonus', price: 1649, best: true },
  { id: 5, t: '50000 UC', total: '68000 UC Total', bonus: '+18000 Bonus', price: 2030, best: false },
  { id: 6, t: '60000 UC', total: '82000 UC Total', bonus: '+22000 Bonus', price: 2440, best: false },
  { id: 7, t: '70000 UC', total: '100000 UC Total', bonus: '+30000 Bonus', price: 2849, best: true },
];

export default function App() {
  const [uid, setUid] = useState('');
  const [sel, setSel] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const s = localStorage.getItem('pubg_uid');
    if (s) setUid(s);
    try { setOrders(JSON.parse(localStorage.getItem('orders') || '[]')); } catch {}
  }, []);

  const buy = (p: any) => {
    if (!uid.trim()) { alert('Pehle UID dalo!'); return; }
    const updated = [{ id: Date.now(), pack: p.t, uid, price: p.price }, ...orders];
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    localStorage.setItem('pubg_uid', uid);
    setSel(null);
    alert('✅ Order Success! ' + p.t);
  };

  return (
    <div style={{ background: '#050b1e', color: 'white', minHeight: '100vh', padding: '16px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontWeight: 900, fontSize: '20px' }}>🎮 UNKNOWN UC STORE</h1>
        <div style={{ background: '#14296b', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>Orders: {orders.length}</div>
      </div>

      <div style={{ background: 'linear-gradient(90deg,#0c1b48,#14296b)', border: '1px solid #233878', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
        <h2 style={{ fontWeight: 900, fontSize: '20px' }}>PUBG UC 12K TO 70K</h2>
        <p style={{ fontSize: '13px', color: '#aab', marginTop: '4px' }}>Fast • Safe • Instant Delivery • 24/7</p>
      </div>

      <div style={{ background: '#0a122e', border: '1px solid #1b2b5d', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700 }}>Your PUBG Character UID *</label>
        <input value={uid} onChange={e => setUid(e.target.value)} placeholder="5123456783" style={{ width: '100%', marginTop: '8px', background: '#050b1e', border: '1px solid #233878', borderRadius: '10px', padding: '12px', color: 'white', outline: 'none' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {PACKS.map((p: any) => (
          <div key={p.id} style={{ background: '#0a122e', border: p.best ? '2px solid #fbbf24' : '1px solid #1b2b5d', borderRadius: '14px', padding: '14px', position: 'relative' }}>
            {p.best && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: 'black', fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '10px' }}>BEST</span>}
            <div style={{ fontWeight: 900 }}>{p.t}</div>
            <div style={{ color: '#fbbf24', fontSize: '13px', marginTop: '2px' }}>{p.total}</div>
            <div style={{ color: '#34d399', fontSize: '12px', marginTop: '2px' }}>{p.bonus}</div>
            <div style={{ fontWeight: 900, marginTop: '8px' }}>AED {p.price}</div>
            <button onClick={() => setSel(p)} style={{ width: '100%', marginTop: '10px', background: '#2a4bff', color: 'white', padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '13px' }}>SELECT</button>
          </div>
        ))}
      </div>

      {sel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
          <div style={{ background: '#0a122e', border: '1px solid #233878', borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '340px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '18px' }}>Confirm Order</h3>
            <div style={{ marginTop: '12px', background: '#050b1e', padding: '12px', borderRadius: '10px', fontSize: '13px', lineHeight: '1.6' }}>
              <div>Pack: <b style={{ color: '#fbbf24' }}>{sel.t}</b></div>
              <div>Total: <b>{sel.total}</b></div>
              <div>UID: <b>{uid || 'Not set'}</b></div>
              <div>Price: <b style={{ color: '#34d399' }}>AED {sel.price}</b></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button onClick={() => setSel(null)} style={{ flex: 1, background: '#334155', padding: '12px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 700 }}>Cancel</button>
              <button onClick={() => buy(sel)} style={{ flex: 1, background: '#2a4bff', padding: '12px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 700 }}>Pay & Buy</button>
            </div>
          </div>
        </div>
      )}
      <p style={{ marginTop: '20px', fontSize: '11px', color: '#666', textAlign: 'center' }}>© UNKNOWN UC STORE</p>
    </div>
  );
}
