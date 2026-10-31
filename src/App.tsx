import { useState, useEffect } from 'react';

const PACKS = [
  { id: 1, t: '12000 UC', uc: 12000, bonus: 3000, price: 490, best: false },
  { id: 2, t: '24000 UC', uc: 24000, bonus: 8000, price: 980, best: false },
  { id: 3, t: '30000 UC', uc: 30000, bonus: 10000, price: 1220, best: false },
  { id: 4, t: '40500 UC', uc: 40500, bonus: 15000, price: 1649, best: true },
  { id: 5, t: '50000 UC', uc: 50000, bonus: 18000, price: 2030, best: false },
  { id: 6, t: '60000 UC', uc: 60000, bonus: 22000, price: 2440, best: false },
  { id: 7, t: '70000 UC', uc: 70000, bonus: 30000, price: 2849, best: true },
];

export default function App() {
  const [uid, setUid] = useState('');
  const [sel, setSel] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pubg_uid');
    if (saved) setUid(saved);
    try {
      const o = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(o);
    } catch {}
  }, []);

  const buy = (p: any) => {
    if (!uid.trim()) { alert('Pehle UID dalo!'); return; }
    const newOrder = { id: 'ORD-' + Date.now(), pack: p.t, uid, price: p.price };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    localStorage.setItem('pubg_uid', uid);
    setSel(null);
    alert('✅ Order Success! ' + p.t + ' UID: ' + uid);
  };

  return (
    <div className="min-h-screen bg-[#050b1e] text-white flex flex-col">
      <header className="bg-[#0a122e] border-b border-[#1b2b5d] p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-black text-xl">🎮 UNKNOWN UC STORE</h1>
        <div className="bg-[#14296b] px-3 py-1 rounded-full text-xs">Orders: {orders.length}</div>
      </header>
      <main className="max-w-5xl mx-auto w-full p-4 space-y-4">
        <div className="bg-gradient-to-r from-[#0c1b48] to-[#14296b] border border-[#233878] rounded-2xl p-5">
          <h2 className="text-2xl font-black">PUBG UC 12K TO 70K</h2>
          <p className="text-sm text-slate-300 mt-1">Fast • Safe • Instant Delivery • 24/7</p>
        </div>
        <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-4">
          <label className="text-sm font-bold">Your PUBG Character UID *</label>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="5123456783" className="w-full mt-2 bg-[#050b1e] border border-[#233878] rounded-lg p-3 text-white outline-none" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PACKS.map((p:any) => (
            <div key={p.id} className={`bg-[#0a122e] border rounded-xl p-4 relative ${p.best ? 'border-amber-400' : 'border-[#1b2b5d]'}`}>
              {p.best && <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black px-2 py-1 rounded-full">BEST</span>}
              <div className="font-black text-lg">{p.t}</div>
              <div className="text-amber-300 font-bold">{p.uc + p.bonus} UC</div>
              <div className="text-xs text-emerald-400">+{p.bonus} Bonus UC</div>
              <div className="text-white font-black mt-2">AED {p.price}</div>
              <button onClick={()=>setSel(p)} className="w-full mt-3 bg-[#2a4bff] py-2.5 rounded-lg font-bold text-sm">SELECT</button>
            </div>
          ))}
        </div>
      </main>
      {sel && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a122e] border border-[#233878] rounded-2xl p-5 w-full max-w-sm">
            <h3 className="font-black text-xl">Confirm Order</h3>
            <div className="mt-3 space-y-1 text-sm bg-[#050b1e] p-3 rounded-lg">
              <p>Pack: <b className="text-amber-300">{sel.t}</b></p>
              <p>Total UC: <b>{sel.uc + sel.bonus}</b></p>
              <p>UID: <b>{uid}</b></p>
              <p>Price: <b className="text-green-400">AED {sel.price}</b></p>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={()=>setSel(null)} className="flex-1 bg-slate-700 py-2.5 rounded-xl font-bold">Cancel</button>
              <button onClick={()=>buy(sel)} className="flex-1 bg-[#2a4bff] py-2.5 rounded-xl font-bold">Pay & Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
