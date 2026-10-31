import { useState, useEffect } from 'react';

const PACKS = [
  { id: 1, title: '24000 UC', uc: 24000, price: 980, bonus: 8000, best: false },
  { id: 2, title: '30000 UC', uc: 30000, price: 1220, bonus: 10000, best: false },
  { id: 3, title: '40500 UC', uc: 40500, price: 1649, bonus: 15000, best: true },
  { id: 4, title: '50000 UC', uc: 50000, price: 2030, bonus: 18000, best: false },
  { id: 5, title: '60000 UC', uc: 60000, price: 2440, bonus: 22000, best: false },
  { id: 6, title: '70000 UC', uc: 70000, price: 2849, bonus: 30000, best: true },
];

export default function App() {
  const [uid, setUid] = useState('');
  const [selected, setSelected] = useState(null as any);
  const [orders, setOrders] = useState([] as any[]);

  useEffect(() => {
    const savedUid = localStorage.getItem('pubg_uid');
    if (savedUid) setUid(savedUid);
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    } catch {}
  }, []);

  const buy = (pack: any) => {
    if (!uid.trim()) { alert('Pehle UID dalo!'); return; }
    const order = { id: 'ORD-'+Date.now(), pack: pack.title, uid, time: new Date().toLocaleTimeString() };
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    localStorage.setItem('pubg_uid', uid);
    setSelected(null);
    alert('Order Success! ' + pack.title + ' UID: ' + uid);
  };

  return (
    <div className="min-h-screen bg-[#050b1e] text-white flex flex-col">
      <header className="bg-[#0a122e] border-b border-[#1b2b5d] p-4 flex justify-between items-center">
        <h1 className="font-black text-xl">🎮 UNKNOWN UC STORE</h1>
        <div className="bg-[#14296b] px-3 py-1 rounded-full text-xs">Orders: {orders.length}</div>
      </header>
      <main className="max-w-5xl mx-auto w-full p-4 space-y-5">
        <div className="bg-gradient-to-r from-[#0c1b48] to-[#14296b] border border-[#233878] rounded-2xl p-5">
          <h2 className="text-2xl font-black">PUBG UC INSTANT TOP-UP</h2>
          <p className="text-sm text-slate-300 mt-1">24K to 70K • Fast • Safe • Anti-Ban</p>
        </div>
        <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-4">
          <label className="text-sm font-bold">Your PUBG Character UID *</label>
          <input value={uid} onChange={(e)=>setUid(e.target.value)} placeholder="5123456783" className="w-full mt-2 bg-[#050b1e] border border-[#233878] rounded-lg p-3 text-white outline-none" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PACKS.map((pack:any) => (
            <div key={pack.id} className={`bg-[#0a122e] border rounded-xl p-4 relative ${pack.best ? 'border-amber-400' : 'border-[#1b2b5d]'}`}>
              {pack.best && <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black px-2 py-1 rounded-full">BEST</span>}
              <div className="font-black text-lg">{pack.title}</div>
              <div className="text-amber-300 font-bold">{pack.uc + pack.bonus} UC</div>
              <div className="text-xs text-emerald-400">+{pack.bonus} Bonus UC</div>
              <div className="text-white font-black mt-2">AED {pack.price}</div>
              <button onClick={()=>setSelected(pack)} className="w-full mt-3 bg-[#2a4bff] py-2 rounded-lg font-bold text-sm">SELECT</button>
            </div>
          ))}
        </div>
      </main>
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a122e] border border-[#233878] rounded-2xl p-5 w-full max-w-sm">
            <h3 className="font-black text-xl">Confirm Order</h3>
            <p className="mt-3 text-sm">Pack: <b>{selected.title}</b></p>
            <p className="text-sm">Total UC: <b className="text-amber-300">{selected.uc + selected.bonus}</b></p>
            <p className="text-sm">UID: <b>{uid}</b></p>
            <p className="text-sm">Price: <b>AED {selected.price}</b></p>
            <div className="flex gap-2 mt-5">
              <button onClick={()=>setSelected(null)} className="flex-1 bg-slate-700 py-
