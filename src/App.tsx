import React, { useState } from 'react';

const PACKS = [
  { id: 1, title: '60 UC', uc: 60, price: 4, bonus: 0, best: false },
  { id: 2, title: '325 UC', uc: 325, price: 20, bonus: 25, best: false },
  { id: 3, title: '660 UC', uc: 660, price: 40, bonus: 60, best: true },
  { id: 4, title: '1800 UC', uc: 1800, price: 99, bonus: 300, best: false },
  { id: 5, title: '3850 UC', uc: 3850, price: 199, bonus: 850, best: false },
  { id: 6, title: '8100 UC', uc: 8100, price: 399, bonus: 2100, best: false },
  { id: 7, title: '40500 UC (BEST)', uc: 40500, price: 1649, bonus: 15000, best: true },
];

export default function App() {
  const [uid, setUid] = useState(localStorage.getItem('pubg_uid') || '');
  const [selected, setSelected] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('orders') || '[]') } catch { return [] }
  });

  const buy = (pack: any) => {
    if (!uid.trim()) { alert('⚠️ Pehle UID dalo!'); return; }
    const order = { id: 'ORD-'+Date.now(), pack: pack.title, uc: pack.uc, uid, time: new Date().toLocaleTimeString() };
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    localStorage.setItem('pubg_uid', uid);
    setSelected(null);
    alert(`✅ Order Success!\n${pack.title} - ${pack.uc} UC\nUID: ${uid}\nOrder ID: ${order.id}`);
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
          <p className="text-sm text-slate-300 mt-1">Fast • Safe • 100% Anti-Ban • 24/7</p>
        </div>

        <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-4">
          <label className="text-sm font-bold">Your PUBG Character UID *</label>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="5123456783" className="w-full mt-2 bg-[#050b1e] border border-[#233878] rounded-lg p-3 text-white outline-none" />
          <p className="text-xs text-slate-400 mt-2">UID Profile > Settings > Copy</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PACKS.map(pack => (
            <div key={pack.id} className={`bg-[#0a122e] border rounded-xl p-4 relative ${pack.best ? 'border-amber-400' : 'border-[#1b2b5d]'}`}>
              {pack.best && <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black px-2 py-1 rounded-full">BEST</span>}
              <div className="font-black text-lg">{pack.title}</div>
              <div className="text-amber-300 font-bold">{pack.uc + pack.bonus} UC</div>
              {pack.bonus>0 && <div className="text-xs text-emerald-400">+{pack.bonus} Bonus</div>}
              <div className="text-white font-black mt-2">AED {pack.price}</div>
              <button onClick={()=>setSelected(pack)} className="w-full mt-3 bg-[#2a4bff] hover:bg-[#1a3aef] py-2 rounded-lg font-bold text-sm">SELECT</button>
            </div>
          ))}
        </div>

        {orders.length>0 && (
          <div className="bg-[#0a122e] border border-[#1b2b5d] rounded-xl p-4">
            <h3 className="font-bold mb-2">Recent Orders</h3>
            {orders.slice(0,5).map(o=>(
              <div key={o.id} className="text-xs bg-[#050b1e] p-2 rounded-lg mb-2 flex justify-between"><span>{o.pack} - {o.uid}</span><span>{o.time}</span></div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-[#0a122e] border-t border-[#1b2b5d] p-4 text-center text-xs text-slate-400 mt-auto">© 2026 UNKNOWN UC - Instant Delivery • Secure Payment</footer>

      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a122e] border border-[#233878] rounded-2xl p-5 w-full max-w-sm">
            <h3 className="font-black text-xl">Confirm Order</h3>
            <p className="mt-3 text-sm">Pack: <b>{selected.title}</b></p>
            <p className="text-sm">Total UC: <b className="text-amber-300">{selected.uc + selected.bonus}</b></p>
            <p className="text-sm">UID: <b>{uid}</b></p>
            <p className="text-sm">Price: <b>AED {selected.price}</b></p>
            <div className="flex gap-2 mt-5">
              <button onClick={()=>setSelected(null)} className="flex-1 bg-slate-700 py-2.5 rounded-xl font-bold">Cancel</button>
              <button onClick={()=>buy(selected)} className="flex-1 bg-[#2a4bff] py-2.5 rounded-xl font-bold">Pay & Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
